$originalLocation = Get-Location
$projectName = "Tac.Media.WebApp"

Set-Location ".."

if (Test-Path -Path "build") {
    echo "Removed old Build"
    Remove-Item -Recurse -Force "build"
} 

New-Item -Path . -Name "build" -ItemType "directory"

$buildPath = Get-Location
$boundlePath = "$buildPath/boundle" 

if (-Not(Test-Path -Path $boundlePath)) {
    echo "Creating boudle dir"
    New-Item -Path . -Name "boundle" -ItemType "directory"
} 

$buildPath = "$buildPath/build"

Set-Location "src/$projectName"

dotnet publish --configuration Release --output $buildPath Tac.Media.WebApp.csproj

Set-Location $buildPath

$exclude = @("*.pdb")
$files = Get-ChildItem -Path $buildPath -Exclude $exclude

$boundlePathAndName = "$boundlePath/Tac.Media.WebApp.Boundle.zip"

if (Test-Path -Path $boundlePathAndName) {
    echo "Removed old Boundle"
    Remove-Item -Recurse -Force $boundlePathAndName
} 

Compress-Archive -Path $files -DestinationPath $boundlePathAndName -CompressionLevel Optimal

Set-Location ".."
Remove-Item -Recurse -Force "build"

Set-Location $boundlePath

ls
scp Tac.Media.WebApp.Boundle.zip agency@lab.theagencyclan.pt:/home/agency


Set-Location $originalLocation
