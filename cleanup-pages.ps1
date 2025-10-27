# Script to clean up redundant page files

$pages = @(
    "AboutPage",
    "ActivitiesPage", 
    "CertificatesPage",
    "ContactPage",
    "EducationPage",
    "HomePage",
    "PrizesPage",
    "ProjectsPage",
    "SkillsPage"
)

foreach ($page in $pages) {
    $jsFile = "d:\ProjectCode\my-website\src\pages\$page\$page.js"
    $scssFile = "d:\ProjectCode\my-website\src\pages\$page\$page.scss"
    
    # Remove JS file
    if (Test-Path $jsFile) {
        Remove-Item -Path $jsFile -Force
        Write-Host "Deleted: $page/$page.js"
    }
    
    # Remove SCSS file
    if (Test-Path $scssFile) {
        Remove-Item -Path $scssFile -Force
        Write-Host "Deleted: $page/$page.scss"
    }
}

Write-Host "All redundant page files have been deleted!"