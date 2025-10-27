# Script to update container files to import SCSS and use container class

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
import './$($page.PageName).scss';

const $($page.PageName) = () => {
  return (
    <div className="$($page.PageName.ToLower())-container">
      <$($page.ComponentName) />
    </div>
  );
};

export default $($page.PageName);
"@
    
    Set-Content -Path $indexPath -Value $content -Encoding UTF8
    Write-Host "Updated: $($page.PageName)/index.js"
}

Write-Host "All container files have been updated with SCSS imports and container classes!"