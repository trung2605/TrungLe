# Script to rename component functions and update imports

$components = @(
    @{Old="ActivitiesPage"; New="Activities"},
    @{Old="CertificatesPage"; New="Certificates"},
    @{Old="ContactPage"; New="Contact"},
    @{Old="EducationPage"; New="Education"},
    @{Old="HomePage"; New="Home"},
    @{Old="PrizesPage"; New="Prizes"},
    @{Old="ProjectsPage"; New="Projects"},
    @{Old="SkillsPage"; New="Skills"}
)

foreach ($comp in $components) {
    $filePath = "d:\ProjectCode\my-website\src\components\$($comp.New)\$($comp.New).js"
    
    if (Test-Path $filePath) {
        $content = Get-Content -Path $filePath -Raw
        
        # Update SCSS import
        $content = $content -replace "import ['""]\./$($comp.Old)\.scss['""];", "import './$($comp.New).scss';"
        
        # Update function name
        $content = $content -replace "const $($comp.Old) = \(\) =>", "const $($comp.New) = () =>"
        
        # Update export
        $content = $content -replace "export default $($comp.Old);", "export default $($comp.New);"
        
        # Update className reference if exists
        $content = $content -replace "className=['""]$($comp.Old.ToLower())-page['""]", "className=""$($comp.New.ToLower())-page"""
        
        Set-Content -Path $filePath -Value $content -Encoding UTF8
        Write-Host "Updated: $($comp.New).js"
    }
}

Write-Host "All component functions have been renamed!"