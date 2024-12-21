// src/utils/helpers.js
export const getConclusionContent = (analysis) => {
  if (!analysis) return { title: "", description: "" };
  
  try {
    const analysisPoints = JSON.parse(analysis).split("\n\n");
    const conclusionPoint = analysisPoints.find(point => 
      point.includes("Conclusion:") || 
      point.includes("### Conclusion:")
    );

    if (conclusionPoint) {
      const match = conclusionPoint.match(/\*\*([^*]+)\*\*\s*-\s*(.+)/);
      if (match) {
        return {
          title: match[1].trim(),
          description: match[2].trim()
        };
      }
    }
  } catch (error) {
    console.error('Error parsing analysis:', error);
  }

  return {
    title: "The Wallet of Woe",
    description: "Your saga of crypto adventures, featuring missed opportunities, questionable decisions, and a collection of tokens that tell quite a story."
  };
};