
export const theme = {
  colors: {
    // Backgrounds
    background: '#faf6f0',     // page background — warm off-white
    surface: '#ffffff',        // cards, inputs — pure white
    surfaceMuted: '#f4efe8',   // read-only fields, subtle fills
    
    // Borders
    border: '#e8e2d9',         // default borders
    borderStrong: '#d8d0c4',   // emphasized borders (focused, active)
    
    // Brand
    primary: '#e67e22',        // the warm orange — accents, active states
    primarySoft: '#fdf0e6',    // soft orange fill behind results
    primaryDark: '#b9601a',    // darker orange for text on soft fill
    
    // Text
    text: '#2c2c2a',           // primary text
    textMuted: '#8a857d',      // secondary text, labels
    textFaint: '#b5afa5',      // hints, placeholders
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
  
  fontSize: {
    label: 13,     // small labels above inputs
    body: 16,      // standard text
    subtitle: 18,  // section subheadings
    input: 28,     // numbers in input fields
    title: 32,     // screen titles
  },
  
  // Cross-platform shadow for cards (iOS + Android)
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,  // Android
  },
};