# Script to create container page files

$pages = @(
    @{PageName="ActivitiesPage"; ComponentName="Activities"},
    @{PageName="CertificatesPage"; ComponentName="Certificates"},
    @{PageName="ContactPage"; ComponentName="Contact"},
    @{PageName="EducationPage"; ComponentName="Education"},
    @{PageName="HomePage"; ComponentName="Home"},
    @{PageName="PrizesPage"; ComponentName="Prizes"},
    @{PageName="ProjectsPage"; ComponentName="Projects"},
    @{PageName="SkillsPage"; ComponentName="Skills"}
)

foreach ($page in $pages) {
    $indexPath = "d:\ProjectCode\my-website\src\pages\$($page.PageName)\index.js"
    
    $content = @"
import React from 'react';
import $($page.ComponentName) from '../../components/$($page.ComponentName)/$($page.ComponentName)';

const $($page.PageName) = () => {
  return <$($page.ComponentName) />;
};

export default $($page.PageName);
"@
    
    Set-Content -Path $indexPath -Value $content -Encoding UTF8
    Write-Host "Created: $($page.PageName)/index.js"
}

Write-Host "All container pages have been created!"