# Script to move all PNG and JPG files from Technology folder to TechnologyCertificates folder

$sourceDir = "d:\ProjectCode\my-website\src\assets\Certificate\Technology"
$destDir = "d:\ProjectCode\my-website\src\assets\Certificate\TechnologyCertificates"

# Ensure destination directory exists
if (!(Test-Path $destDir)) {
    New-Item -Path $destDir -ItemType Directory -Force
}

# Find and move all image files
$imageFiles = Get-ChildItem -Path $sourceDir -Recurse -Include "*.png","*.jpg","*.jpeg"

foreach ($file in $imageFiles) {
    try {
        $newName = $file.Name
        $destPath = Join-Path $destDir $newName
        
        # If file with same name exists, add a number
        $counter = 1
        while (Test-Path $destPath) {
            $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
            $extension = [System.IO.Path]::GetExtension($file.Name)
            $newName = "$nameWithoutExt-$counter$extension"
            $destPath = Join-Path $destDir $newName
            $counter++
        }
        
        Move-Item -Path $file.FullName -Destination $destPath -Force
        Write-Host "Moved: $($file.Name) -> $newName"
    }
    catch {
        Write-Host "Error moving $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host "Certificate image files have been moved successfully!"