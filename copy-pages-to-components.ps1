# Script to move all page components to src/components

$pages = @(
    @{Old="ActivitiesPage"; New="Activities"},
    @{Old="CertificatesPage"; New="Certificates"},
    @{Old="ContactPage"; New="Contact"},
    @{Old="EducationPage"; New="Education"},
    @{Old="HomePage"; New="Home"},
    @{Old="PrizesPage"; New="Prizes"},
    @{Old="ProjectsPage"; New="Projects"},
    @{Old="SkillsPage"; New="Skills"}
)

foreach ($page in $pages) {
    $oldJs = "d:\ProjectCode\my-website\src\pages\$($page.Old)\$($page.Old).js"
    $oldScss = "d:\ProjectCode\my-website\src\pages\$($page.Old)\$($page.Old).scss"
    $newJs = "d:\ProjectCode\my-website\src\components\$($page.New)\$($page.New).js"
    $newScss = "d:\ProjectCode\my-website\src\components\$($page.New)\$($page.New).scss"
    
    # Copy JS file
    if (Test-Path $oldJs) {
        Copy-Item -Path $oldJs -Destination $newJs -Force
        Write-Host "Copied: $($page.Old).js -> $($page.New).js"
    }
    
    # Copy SCSS file
    if (Test-Path $oldScss) {
        Copy-Item -Path $oldScss -Destination $newScss -Force
        Write-Host "Copied: $($page.Old).scss -> $($page.New).scss"
    }
}

Write-Host "All page components have been copied to src/components!"