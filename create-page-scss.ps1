# Script to create SCSS files for each page container

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
    $scssPath = "d:\ProjectCode\my-website\src\pages\$page\$page.scss"
    
    $content = @"
/* $page Container Styles */
/* This file is for page-specific container styling */
/* The main component styles are in src/components/ */

.${page.ToLower()}-container {
  // Container-specific styles can be added here
  // Example: specific layout, spacing, or wrapper styling
  // that only applies to this page container
  
  min-height: 100vh;
  width: 100%;
  
  // You can add page-specific overrides here if needed
  // Example:
  // padding: 2rem;
  // background: var(--page-background);
  // max-width: 1200px;
  // margin: 0 auto;
}

// Page-specific responsive breakpoints or container queries
@media (max-width: 768px) {
  .${page.ToLower()}-container {
    // Mobile-specific container styles
  }
}

@media (min-width: 1024px) {
  .${page.ToLower()}-container {
    // Desktop-specific container styles
  }
}
"@
    
    Set-Content -Path $scssPath -Value $content -Encoding UTF8
    Write-Host "Created: $page.scss"
}

Write-Host "All page container SCSS files have been created!"