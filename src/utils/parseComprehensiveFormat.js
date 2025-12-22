/**
 * Parses the comprehensive format with design-brief, react, and manifest tags
 * Converts it to the playground's MANIFEST + Component format
 */
export function parseComprehensiveFormat(input) {
  const designBriefMatch = input.match(/<design-brief>([\s\S]*?)<\/design-brief>/);
  const reactMatch = input.match(/<react>([\s\S]*?)<\/react>/);
  const cssMatch = input.match(/<css>([\s\S]*?)<\/css>/);
  const manifestMatch = input.match(/<manifest>([\s\S]*?)<\/manifest>/);

  if (!reactMatch && !manifestMatch) {
    return null; // Not a comprehensive format
  }

  try {
    // Extract content
    const designBrief = designBriefMatch ? designBriefMatch[1].trim() : '';
    const reactCode = reactMatch ? reactMatch[1].trim() : '';
    const cssCode = cssMatch ? cssMatch[1].trim() : '';
    const manifestCode = manifestMatch ? manifestMatch[1].trim() : '';

    // Parse manifest JSON
    let manifestObj = {};
    if (manifestCode) {
      manifestObj = JSON.parse(manifestCode);
    }

    // Build the playground format
    let output = '';

    // Add MANIFEST
    output += `const MANIFEST = ${JSON.stringify(manifestObj, null, 2)};\n\n`;

    // Add Component function
    if (reactCode) {
      output += `${reactCode}\n\n`;
    }

    // Optionally embed CSS as inline styles helper
    if (cssCode) {
      output += `/* CSS (convert to inline styles):\n${cssCode}\n*/\n`;
    }

    return {
      code: output,
      designBrief,
      manifest: manifestObj
    };
  } catch (err) {
    console.error('Failed to parse comprehensive format:', err);
    return null;
  }
}

/**
 * Auto-detect and parse if input is in comprehensive format
 * Returns parsed code or original input
 */
export function autoParseInput(input) {
  const parsed = parseComprehensiveFormat(input);
  if (parsed) {
    return parsed.code;
  }
  return input;
}

