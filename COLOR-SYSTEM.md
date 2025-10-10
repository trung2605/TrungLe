# 🎨 Hệ thống màu sắc Website

## 📁 Cấu trúc file CSS/SCSS

```
src/styles/
├── _colors.scss          # 🎨 CHÍNH - Hệ thống màu sắc tập trung
├── _variables.scss       # 📏 Spacing, Typography, Transitions
├── _mixins.scss          # 🔧 Mixins và utilities
├── _theme-demo.scss      # 🌈 Các theme màu mẫu
├── global.scss           # 🌍 Global styles
├── components/           # 🧩 Component styles
└── pages/               # 📄 Page styles
```

## 🎯 Màu chủ đạo hiện tại: **XANH DƯƠNG**

### 🔵 Primary Colors (Màu chính)
- `--primary-500`: #3b82f6 (Main blue)
- `--primary-300`: #93c5fd (Light blue) 
- `--primary-700`: #1d4ed8 (Dark blue)

### 🌊 Secondary Colors (Màu phụ)
- `--secondary-500`: #0ea5e9 (Sky blue)
- `--secondary-400`: #38bdf8 (Light sky)
- `--secondary-600`: #0284c7 (Dark sky)

### 💙 Accent Colors (Màu nhấn)
- `--accent-500`: #6366f1 (Indigo)
- `--accent-600`: #4f46e5 (Dark indigo)

## 🛠️ Cách thay đổi theme màu

### Phương pháp 1: Sử dụng theme có sẵn
1. Mở file `src/styles/_theme-demo.scss`
2. Copy một theme bạn thích (Green, Purple, Orange)
3. Paste vào cuối file `src/styles/_colors.scss`
4. Save và xem website thay đổi ngay lập tức! ✨

### Phương pháp 2: Tạo theme tùy chỉnh
1. Mở file `src/styles/_colors.scss`
2. Thay đổi các giá trị màu:
   ```scss
   --primary-500: #your-main-color;
   --primary-600: #your-darker-shade;
   --primary-700: #your-darkest-shade;
   ```
3. Cập nhật gradients:
   ```scss
   --gradient-primary: linear-gradient(135deg, var(--primary-500), var(--primary-700));
   --gradient-text: linear-gradient(135deg, var(--primary-600), var(--accent-600));
   ```

## 🎨 Các biến màu quan trọng

### Background & Text
```scss
--bg-primary: #ffffff;      // Nền chính
--bg-secondary: #f8fafc;    // Nền phụ  
--text-primary: #0f172a;    // Text chính
--text-secondary: #475569;  // Text phụ
```

### Gradients
```scss
--gradient-primary: linear-gradient(135deg, var(--primary-500), var(--primary-700));
--gradient-text: linear-gradient(135deg, var(--primary-600), var(--accent-600));
--gradient-hero: linear-gradient(135deg, var(--primary-500), var(--secondary-500), var(--accent-500));
```

### Shadows
```scss
--shadow-primary: 0 10px 15px -3px rgba(var(--primary-500), 0.3);
--shadow-lg: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
```

## 🚀 Theme suggestions

### 🌿 Cho website thiên nhiên/môi trường
- **Green Theme**: Xanh lá, tươi mát, thân thiện

### 🎨 Cho website sáng tạo/nghệ thuật  
- **Purple Theme**: Tím, sang trọng, sáng tạo

### 🔥 Cho website năng động/thể thao
- **Orange Theme**: Cam, năng lượng, nhiệt huyết

### 💼 Cho website doanh nghiệp
- **Blue Theme** (hiện tại): Xanh dương, chuyên nghiệp, tin cậy

## 💡 Pro Tips

1. **Test trên cả Light & Dark mode**: Theme tự động adjust cho dark mode
2. **Giữ contrast tốt**: Đảm bảo text dễ đọc trên background
3. **Consistency**: Tất cả components sẽ tự động sử dụng màu mới
4. **Hot reload**: Thay đổi sẽ xuất hiện ngay lập tức khi save file

## 📱 Responsive & Accessibility

- Màu sắc responsive trên mọi thiết bị
- High contrast cho accessibility
- Focus states rõ ràng với outline colors
- Color-blind friendly combinations

---

**🎉 Enjoy customizing your website colors!**