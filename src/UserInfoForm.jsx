import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; 

const HealthWellnessForm = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthGoal, setHealthGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://127.0.0.1:5001/generate-tips", {
        age,
        gender,
        activity_level: activityLevel,
        health_goal: healthGoal,
      });

      setResponse(formatResponse(res.data.message));  
    } catch (error) {
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (message) => {
    const formattedMessage = message
      .replace(/(\*\*[^*]+\*\*)/g, (match) => {
        return `<h5 style="background-color: #f0f8ff; color: #333; padding: 5px 10px; border-radius: 4px; margin-top: 10px;">${match.replace(/\*\*/g, "")}</h5>`;
      })  
      .replace(/\* (.*?)\n/g, (match, p1) => `<p style="padding-left: 20px;">${p1}</p>\n`); // Convert bulleted items into paragraphs with line breaks
  
    return `<div>${formattedMessage}</div>`;  
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    
    const content = document.getElementById("responseContent").innerText;

    doc.autoTable({
      startY: 10, 
      body: [[content]], 
      margin: { top: 20 },
      styles: {
        fontSize: 12, 
        cellPadding: 5, 
        minCellHeight: 10, 
        halign: "left", 
      },
      didDrawPage: () => {
        const pageHeight = doc.internal.pageSize.height;
        const contentHeight = doc.lastAutoTable.finalY; 
        
        if (contentHeight >= pageHeight) {
          doc.addPage();
        }
      },
    });

    doc.save("health_wellness_recommendations.pdf");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Health Wellness Chatbot</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded border"
        style={{ maxWidth: "500px", margin: "0 auto", boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 24px" }}
      >
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="activityLevel" className="form-label">Activity Level</label>
          <select
            id="activityLevel"
            className="form-select"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            required
          >
            <option value="">Select Activity Level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="healthGoal" className="form-label">Health Goal</label>
          <select
            id="healthGoal"
            className="form-select"
            value={healthGoal}
            onChange={(e) => setHealthGoal(e.target.value)}
            required
          >
            <option value="">Select Health Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="general_health">General Health</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-3 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
          <h5 className="text-center">Recommendations:</h5>
          <div id="responseContent" dangerouslySetInnerHTML={{ __html: response }}></div> 
          <button onClick={handleDownload} className="btn btn-success mt-3 w-100">
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthWellnessForm;
