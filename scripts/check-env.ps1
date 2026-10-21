$ErrorActionPreference = "SilentlyContinue"

Write-Host ""
Write-Host "Full-Stack Exercise · Environment Check"
Write-Host "----------------------------------------"

$missing = $false

function Test-RequiredCommand {
    param([string]$Command, [string]$Label, [string[]]$VersionArgs = @("--version"))

    if (Get-Command $Command -ErrorAction SilentlyContinue) {
        $version = (& $Command @VersionArgs 2>&1 | Select-Object -First 1)
        Write-Host ("[OK]   {0,-10} {1}" -f $Label, $version)
    } else {
        Write-Host ("[MISS] {0,-10} not found" -f $Label)
        $script:missing = $true
    }
}

Test-RequiredCommand "java" "Java" @("-version")
Test-RequiredCommand "mvn" "Maven"
Test-RequiredCommand "node" "Node"
Test-RequiredCommand "npm" "npm"

if (Get-Command docker -ErrorAction SilentlyContinue) {
    $dockerVersion = (& docker --version 2>&1 | Select-Object -First 1)
    Write-Host ("[OPT]  {0,-10} {1}" -f "Docker", $dockerVersion)
} else {
    Write-Host ("[OPT]  {0,-10} not found (only needed for fallback startup)" -f "Docker")
}

Write-Host ""
if ($missing) {
    Write-Host "One or more required tools are missing. Docker can be used as a fallback, or ask the interviewer for environment help."
    exit 1
}

Write-Host "Required tools are available. You can start the project."
exit 0
