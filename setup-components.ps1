# Script tự động tổ chức components
$components = @('Education', 'EmailTest', 'Footer', 'Hero3DScene', 'Navbar', 'Prizes')

foreach ($component in $components) {
    Write-Host "Processing $component..."
    
    # Tạo thư mục nếu chưa có
    $folderPath = "src/components/$component"
    if (-not (Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
    }
    
    # Tạo index.js
    $indexContent = "export { default } from './$component';"
    $indexContent | Out-File "$folderPath/index.js" -Encoding UTF8
    
    # Tạo Component.scss cơ bản
    $scssContent = @"
@import '../../styles/variables';
@import '../../styles/mixins';

.$($component.ToLower()) {
  // Component styles will be added here
}
"@
    $scssContent | Out-File "$folderPath/$component.scss" -Encoding UTF8
    
    Write-Host "Created $component folder structure"
}

Write-Host "All components processed!"