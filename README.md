# Document Workflow Helper (Version 2)

A multi-tool workflow assistant designed to speed up document processing, case note creation, and missing document reporting. Built with HTML, CSS, and JavaScript as a lightweight internal productivity tool.

---

## 🚀 Live Tool

Access the tool here:

https://mrplayground.github.io/ArbitFileNameGenerator/

---

## ✨ Version 2 Major Updates

Version 2 introduces major workflow improvements:

- Multi-section layout
- Theme selector (6 themes)
- Arbit Case Notes generator
- Missing Notes automation
- Auto date formatting
- Improved UI scaling
- Tooltip hover for long filenames
- Combined logic outputs
- Persistent theme preference
- Cleaner responsive layout

---

## 🛠 Main Features

### 📄 File Name Generator
Automatically generates standardized filenames:

Format:
```
Dispute_EHR_DOCUMENTTYPE
```

Generated outputs:

| Label | Format |
|-------|--------|
| HCFA | dispute_ehr_HCFA |
| EOB | dispute_ehr_PHYSICALEOB |
| HMO | dispute_ehr_INSURANCECARD |
| OP | dispute_ehr_OPREPORT |
| OP2 | dispute_ehr_OPREPORT2 |
| OP3 | dispute_ehr_OPREPORT3 |

Features:
- Auto generate while typing
- Copy button per file
- Clear all button
- Hover tooltip for long text

---

### 📝 Arbit Case Notes Generator

Automatically builds case notes based on selected corrections.

Supports:

- FR Date correction
- Last EOB correction
- Claim number correction

Logic examples:

Added:
```
Added the FR Date (MM/DD/YYYY).
```

Updated:
```
Updated the FR Date from MM/DD/YYYY to MM/DD/YYYY.
```

Combined logic:
```
Updated the FR Date and Last EOB from DATE to DATE.
```

Features:
- Smart sentence building
- Conditional logic
- Auto date formatting
- Copy output button

---

### ⚠ Missing Notes Generator

Automatically creates escalation notes for missing documents.

Supports:

- MR Notes
- HCFA Notes
- EOB Notes
- Insurance Card
- Check Date / Production EOB

Example output:

```
Failure: Unable to locate EOB/HCFA/MR in USMon portal/RCM/Availity, Doc Mngmt will need to escalate to customer.
```

Features:
- Smart document combinations
- Portal detection logic
- Escalation message automation
- Copy ready output

---

## 🎨 Theme System

Version 2 includes multiple UI themes:

- Light Mode
- Dark Mode
- Black & White
- VS Code Theme
- Greige Theme
- Sleek Theme

Features:
- Instant switching
- Saved preference (localStorage)
- Smooth transitions

---

## ⚡ Productivity Features

- One click copy
- Clear all reset
- Auto date formatting (MM/DD/YYYY)
- Smart combined notes logic
- Persistent theme memory
- Compact professional layout
- Fixed footer contact link

---

## 🛠 Geek stuff used

- HTML5
- CSS3 (Variables & Theme System)
- Vanilla JavaScript
- LocalStorage
- DOM manipulation
- Brain
- Mouse and keyboard
- caffeine 

No frameworks required, just pure caffeine.

---

## 🎯 Purpose

This project was created to:

- Reduce repetitive typing
- Standardize documentation
- Improve processing speed
- Reduce human error
- Automate case notes
- Improve workflow efficiency

---

## 🔮 Planned Improvements (Version 3 ideas)

Possible future upgrades:

- Keyboard shortcuts
- Case note templates
- Input validation alerts
- Workflow presets
- Notes history

---

## 👤 Author

**Angelo**

---

## 📜 License

Free to use and modify for productivity purposes.

---

## 📌 Version History

### Version 1
- Basic filename generator
- Copy buttons
- Clear function

### Version 2
- Multi tool workflow system
- Case notes generator
- Missing notes automation
- Theme system
- Smart text logic
- UI redesign

---

## ⭐ Notes

This tool was built as a personal workflow efficiency project and continues to evolve based on daily operational needs.
