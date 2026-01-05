# 📊 CSV Bulk Generation Format

## CSV File Structure

Your CSV file must have **3 columns** with the following headers:

```csv
Component Category,Component Type,User Request
```

### Column Definitions:

1. **Component Category** - The high-level category (e.g., "Navigation", "Hero Sections", "Complex Slideshows & Carousels")
2. **Component Type** - The specific type within that category (e.g., "Mega Menu", "Video Background Hero", "3D Card Stack")
3. **User Request** - Detailed description of what you want the component to do (can be multi-line)

---

## ✅ Valid CSV Example

```csv
Component Category,Component Type,User Request
"Complex Slideshows & Carousels","Cinematic Ken Burns Gallery","Create a photo gallery with smooth Ken Burns zoom and pan animations on each image. Include navigation dots and autoplay controls."
"Complex Slideshows & Carousels","3D Card Stack Slideshow","Create a 3D card stack carousel where cards stack behind each other with depth perspective. Swipe to navigate between cards."
"Navigation","Mega Menu Dropdown","Create a mega menu that opens on hover and displays multiple columns of links with category headers and icons."
"Hero Sections","Video Background Hero","Create a hero section with full-screen background video (autoplay, muted), overlay gradient, headline, subheading, and CTA button."
```

---

## 📝 CSV Format Rules

### ✅ DO:
- **Use double quotes** around values that contain commas, newlines, or special characters
- **Include all 3 columns** for each row
- **Use the exact header names** in the first row
- **Keep category and type concise** (1-5 words each)
- **Make user requests detailed** (2-4 sentences recommended)

### ❌ DON'T:
- Don't skip columns (all 3 are required)
- Don't use line breaks within cells (unless properly quoted)
- Don't use inconsistent quoting

---

## 🎯 How Multi-Line User Requests Work

If your User Request has multiple lines, wrap it in quotes:

```csv
Component Category,Component Type,User Request
"Navigation","Sidebar Menu","Create a sidebar navigation menu with the following features:
- Collapsible sections
- Icons for each item
- Active state highlighting
- Smooth expand/collapse animations"
```

**This will be converted to:**
```
Category: Navigation, Type: Sidebar Menu - Create a sidebar navigation menu with the following features:
- Collapsible sections
- Icons for each item
- Active state highlighting
- Smooth expand/collapse animations
```

---

## 🔄 Internal Format (Semicolon Separated)

After CSV upload, prompts are internally formatted as:

```
Category: X, Type: Y - Request 1; Category: A, Type: B - Request 2; Category: C, Type: D - Request 3
```

### Manual Entry Format:
If entering manually (without CSV), use semicolons to separate:

```
Category: Complex Slideshows & Carousels, Type: Ken Burns Gallery - Create animated photo gallery;
Category: Navigation, Type: Mega Menu - Create dropdown with multiple columns;
Category: Hero Sections, Type: Video Background - Create hero with video bg
```

---

## 📥 How to Upload CSV

1. **Click** the "Upload CSV File" button in Bulk Mode
2. **Select** your .csv file
3. **Wait** for confirmation toast
4. **Review** the loaded prompts in the textarea
5. **Click** "Bulk Generate with Claude"

---

## 📄 Template File

A template CSV file is included: `public/bulk-components-template.csv`

Download it and modify with your own component requests!

---

## 💡 Example CSV Content

### Template: 10 Complex Components

```csv
Component Category,Component Type,User Request
"Complex Slideshows & Carousels","Cinematic Ken Burns Gallery","Create a photo gallery with smooth Ken Burns zoom and pan animations on each image. Include navigation dots and autoplay controls."
"Complex Slideshows & Carousels","3D Card Stack Slideshow","Create a 3D card stack carousel where cards stack behind each other with depth perspective. Swipe to navigate between cards."
"Navigation","Mega Menu Dropdown","Create a mega menu that opens on hover and displays multiple columns of links with category headers and icons."
"Hero Sections","Video Background Hero","Create a hero section with full-screen background video (autoplay, muted), overlay gradient, headline, subheading, and CTA button."
"Interactive Elements","Animated Counter Stats","Create a statistics display with animated numbers that count up when scrolled into view. Show 4 key metrics with icons and labels."
"Form Components","Multi-Step Form Wizard","Create a multi-step form with progress indicator, validation, back/next buttons, and smooth transitions between steps."
"Content Display","Masonry Grid Gallery","Create a Pinterest-style masonry grid layout that displays images of varying heights in an optimal arrangement."
"Interactive Elements","Comparison Slider","Create a before/after image comparison slider with draggable handle to reveal the difference between two images."
"Charts & Data","Animated Donut Chart","Create an animated donut chart with percentage display in center, legend, and smooth animation on load."
"Navigation","Breadcrumb Navigation","Create a breadcrumb navigation component with separators, home icon, and current page highlighting."
```

---

## 🚀 Usage Workflow

### Option 1: CSV Upload
1. Create CSV with format above
2. Save as `.csv` file
3. Click "Upload CSV File" in Bulk Mode
4. Review loaded prompts
5. Click "Bulk Generate with Claude"

### Option 2: Manual Entry
1. Switch to Bulk Mode
2. Type prompts separated by semicolons:
   ```
   Category: X, Type: Y - Request 1; Category: A, Type: B - Request 2
   ```
3. Click "Bulk Generate with Claude"

---

## 📊 CSV Best Practices

### Component Categories (Examples):
- Navigation
- Hero Sections
- Content Display
- Interactive Elements
- Form Components
- Complex Slideshows & Carousels
- Charts & Data
- Testimonials
- Pricing Tables
- Footer Sections

### Component Types (Examples):
- Cinematic Ken Burns Gallery
- 3D Card Stack Slideshow
- Mega Menu Dropdown
- Video Background Hero
- Animated Counter Stats
- Multi-Step Form Wizard

### User Request Quality:
- **Be specific** about functionality
- **Mention key features** you want included
- **Specify interactions** (hover, click, scroll)
- **Include visual details** (colors, layout, animations)
- **Keep it focused** (one component per request)

---

## 🎨 Generated Component Format

Each CSV row generates a complete React component with:
- ✅ MANIFEST with category and type metadata
- ✅ Full component code with config-based customization
- ✅ All properties exposed in MANIFEST.data
- ✅ Sophisticated, elegant styling (monochromatic palette)
- ✅ Accessibility features
- ✅ Responsive design

---

## 🔍 Troubleshooting

### "Failed to read CSV file"
- Ensure file is valid CSV format
- Check that file is not corrupted
- Verify UTF-8 encoding

### "Please enter at least one valid prompt"
- CSV might be empty or only have headers
- Check that rows have all 3 columns filled

### "Generation failed"
- API key might be incorrect
- Server might be down (check `http://localhost:3001/api/health`)
- Network connection issues

---

## 📁 Example Files

- **Template CSV**: `public/bulk-components-template.csv`
- **Documentation**: `CSV_BULK_FORMAT.md` (this file)

Download the template, customize it with your needs, and start bulk generating! 🚀



