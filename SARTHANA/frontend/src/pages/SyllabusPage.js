import React, { useState } from "react";

const syllabusData = {
  gs1: {
    subjects: ["History", "Geography", "Art & Culture"],
    syllabus: {
      History: ["Ancient Indian History", "Medieval Indian History", "Modern Indian History"],
      Geography: ["Physical Geography", "Human Geography", "Economic Geography"],
      "Art & Culture": ["Indian Architecture", "Performing Arts", "Literature"],
    },
  },
  gs2: {
    subjects: ["Polity", "Governance", "International Relations"],
    syllabus: {
      Polity: ["Indian Constitution", "Federal Structure", "Judiciary"],
      Governance: ["Public Administration", "Welfare Schemes", "Transparency"],
      "International Relations": ["India's Foreign Policy", "Bilateral Relations", "Global Issues"],
    },
  },
  gs3: {
    subjects: ["Economy", "Science & Tech", "Environment"],
    syllabus: {
      Economy: ["Indian Economy", "Agriculture", "Infrastructure"],
      "Science & Tech": ["Space Technology", "IT & Cyber Security", "Biotechnology"],
      Environment: ["Climate Change", "Biodiversity", "Environmental Issues"],
    },
  },
  gs4: {
    subjects: ["Ethics", "Integrity", "Aptitude"],
    syllabus: {
      Ethics: ["Ethical Theories", "Public Values", "Professional Ethics"],
      Integrity: ["Integrity in Public Administration", "Case Studies"],
      Aptitude: ["Problem Solving", "Decision Making", "Logical Reasoning"],
    },
  },
};

const SyllabusSelector = () => {
  const [selectedGS, setSelectedGS] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [syllabus, setSyllabus] = useState([]);

  const handleGSSelection = (e) => {
    const gs = e.target.value;
    setSelectedGS(gs);
    setSubjects(gs ? syllabusData[gs].subjects : []);
    setSelectedSubject("");
    setSyllabus([]);
  };

  const handleSubjectSelection = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    setSyllabus(subject ? syllabusData[selectedGS].syllabus[subject] : []);
  };

  return (
    <div className="homepage-main">
      <h2>UPSC Syllabus</h2>
      <label htmlFor="gs-selection">Select General Studies Paper:</label>
      <select id="gs-selection" value={selectedGS} onChange={handleGSSelection}>
        <option value="">-- Select --</option>
        <option value="gs1">GS1</option>
        <option value="gs2">GS2</option>
        <option value="gs3">GS3</option>
        <option value="gs4">GS4</option>
      </select>

      {subjects.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="subject-selection">Select Subject:</label>
          <select id="subject-selection" value={selectedSubject} onChange={handleSubjectSelection}>
            <option value="">-- Select --</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {syllabus.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Syllabus</h3>
          <ul>
            {syllabus.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SyllabusSelector;
