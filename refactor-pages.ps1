# Script để refactor tất cả pages sử dụng components

$pageComponentMapping = @{
    'ActivitiesPage' = 'Activities'
    'CertificatesPage' = 'Certificates'  
    'EducationPage' = 'Education'
    'PrizesPage' = 'Prizes'
    'ProjectsPage' = 'Projects'
    'SkillsPage' = 'Skills'
}

foreach ($page in $pageComponentMapping.Keys) {
    $component = $pageComponentMapping[$page]
    $pageFile = "src/pages/$page.js"
    
    if (Test-Path $pageFile) {
        Write-Host "Refactoring $page to use $component component..."
        
        $content = @"
import React from 'react';
import $component from '../components/$component';

const $page = () => {
  return (
    <div className="${page.ToLower()}">
      <$component />
    </div>
  );
};

export default $page;
"@
        
        $content | Out-File $pageFile -Encoding UTF8
        Write-Host "✅ $page refactored successfully"
    }
}

Write-Host "🎉 All pages refactored to use components!"