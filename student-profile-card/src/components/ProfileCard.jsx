import React, { useState, useEffect } from "react";
import "./ProfileCard.css";

function ProfileCard() {

  // Load student details from Local Storage
  const [student, setStudent] = useState(() => {
    try {
      const savedStudent = localStorage.getItem("studentProfile");

      return savedStudent
        ? JSON.parse(savedStudent)
        : {
            name: "Kanchan Taware",
            course: "Master of Computer Applications",
            college: "Vidya Pratishthan College, Baramati",
            email: "kanchan@example.com",
            skills: ["HTML", "CSS", "JavaScript", "React JS", "C#", "SQL"]
          };
    } catch {
      return {
        name: "Kanchan Taware",
        course: "Master of Computer Applications",
        college: "Vidya Pratishthan College, Baramati",
        email: "kanchan@example.com",
        skills: ["HTML", "CSS", "JavaScript", "React JS", "C#", "SQL"]
      };
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(student);

  const [errors, setErrors] = useState({});

  // Save student details to Local Storage
  useEffect(() => {
    localStorage.setItem("studentProfile", JSON.stringify(student));
  }, [student]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save profile changes
  const handleSave = () => {

    if (!validateForm()) {
      return;
    }

    setStudent({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      skills: (formData.skillsText || student.skills.join(", "))
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "")
    });

    setIsEditing(false);
    setErrors({});
  };

  // Enable edit mode
  const handleEdit = () => {
    setFormData({
      ...student,
      skillsText: student.skills.join(", ")
    });

    setErrors({});
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-header">

          <img
            src="/student.jpeg"
            alt="Student"
            className="profile-image"
          />

          <h2>Student Profile</h2>
          <p>Welcome to my profile</p>

        </div>

        <div className="profile-details">

          {isEditing ? (
            <>

              <div className="form-group">

                <label>Student Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <p className="error-message">{errors.name}</p>
                )}

              </div>

              <div className="form-group">

                <label>Course</label>

                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>College</label>

                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}

              </div>

              <div className="form-group">

                <label>Technical Skills</label>

                <input
                  type="text"
                  name="skillsText"
                  value={formData.skillsText || ""}
                  onChange={handleChange}
                />

                <small>Separate skills using commas.</small>

              </div>

            </>
          ) : (
            <>

              <div className="detail-item">
                <span>Name</span>
                <strong>{student.name}</strong>
              </div>

              <div className="detail-item">
                <span>Course</span>
                <strong>{student.course}</strong>
              </div>

              <div className="detail-item">
                <span>College</span>
                <strong>{student.college}</strong>
              </div>

              <div className="detail-item">
                <span>Email</span>
                <strong>{student.email}</strong>
              </div>

              <div className="skills-section">

                <h3>Technical Skills</h3>

                <div className="skills-list">

                  {student.skills.map((skill, index) => (
                    <span className="skill" key={index}>
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

            </>
          )}

        </div>

        <div className="button-group">

          {isEditing ? (
            <>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </>
          ) : (

            <button
              className="edit-btn"
              onClick={handleEdit}
            >
              Edit Profile
            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;