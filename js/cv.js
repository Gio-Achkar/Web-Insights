// CV Form Handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cvForm");
  const cvPreviewSection = document.getElementById("cvPreviewSection");
  const cvPreview = document.getElementById("cvPreview");
  const resetBtn = document.getElementById("resetBtn");
  const editBtn = document.getElementById("editBtn");

  // Counter for dynamic entries
  let educationCount = 1;
  let experienceCount = 1;
  let skillCategoryCount = 1;
  let projectCount = 1;
  let certificationCount = 1;

  // Add Education Entry
  document
    .getElementById("addEducation")
    .addEventListener("click", function () {
      const container = document.getElementById("educationContainer");
      const newEntry = createEducationEntry(educationCount);
      container.insertAdjacentHTML("beforeend", newEntry);
      educationCount++;
    });

  // Add Experience Entry
  document
    .getElementById("addExperience")
    .addEventListener("click", function () {
      const container = document.getElementById("experienceContainer");
      const newEntry = createExperienceEntry(experienceCount);
      container.insertAdjacentHTML("beforeend", newEntry);
      experienceCount++;
    });

  // Add Skill Category
  document
    .getElementById("addSkillCategory")
    .addEventListener("click", function () {
      const container = document.getElementById("skillsContainer");
      const newEntry = createSkillCategoryEntry(skillCategoryCount);
      container.insertAdjacentHTML("beforeend", newEntry);
      skillCategoryCount++;
    });

  // Add Project
  document.getElementById("addProject").addEventListener("click", function () {
    const container = document.getElementById("projectsContainer");
    const newEntry = createProjectEntry(projectCount);
    container.insertAdjacentHTML("beforeend", newEntry);
    projectCount++;
  });

  // Add Certification
  document
    .getElementById("addCertification")
    .addEventListener("click", function () {
      const container = document.getElementById("certificationsContainer");
      const newEntry = createCertificationEntry(certificationCount);
      container.insertAdjacentHTML("beforeend", newEntry);
      certificationCount++;
    });

  // Event Delegation for Remove Buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      e.target
        .closest(
          ".education-entry, .experience-entry, .skill-category-entry, .project-entry, .certification-entry"
        )
        .remove();
    }
  });

  // Form Submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Generate CV preview
    generateCVPreview();

    // Show preview section and scroll to it
    cvPreviewSection.style.display = "block";
    cvPreviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Reset Button
  resetBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to clear all form data?")) {
      form.reset();
      cvPreviewSection.style.display = "none";
      clearErrors();

      // Reset to single entries
      document.getElementById("educationContainer").innerHTML =
        createEducationEntry(0);
      document.getElementById("experienceContainer").innerHTML =
        createExperienceEntry(0);
      document.getElementById("skillsContainer").innerHTML =
        createSkillCategoryEntry(0);
      document.getElementById("projectsContainer").innerHTML =
        createProjectEntry(0);
      document.getElementById("certificationsContainer").innerHTML =
        createCertificationEntry(0);

      educationCount = 1;
      experienceCount = 1;
      skillCategoryCount = 1;
      projectCount = 1;
      certificationCount = 1;
    }
  });

  // Edit Button
  editBtn.addEventListener("click", function () {
    cvPreviewSection.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Validation Function
  function validateForm() {
    clearErrors();
    let isValid = true;
    let missingFields = [];
    let firstErrorField = null;

    // Personal Info
    const fullName = document.getElementById("fullName");
    const title = document.getElementById("title");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const summary = document.getElementById("summary");

    // Check Personal Information section
    let personalInfoMissing = false;

    if (fullName.value.trim() === "") {
      showError("fullName", "Full name is required");
      personalInfoMissing = true;
      if (!firstErrorField) firstErrorField = fullName;
    }

    if (title.value.trim() === "") {
      showError("title", "Professional title is required");
      personalInfoMissing = true;
      if (!firstErrorField) firstErrorField = title;
    }

    if (email.value.trim() === "") {
      showError("email", "Email is required");
      personalInfoMissing = true;
      if (!firstErrorField) firstErrorField = email;
    } else if (!isValidEmail(email.value)) {
      showError("email", "Please enter a valid email address");
      personalInfoMissing = true;
      if (!firstErrorField) firstErrorField = email;
    }

    if (phone.value.trim() === "") {
      showError("phone", "Phone number is required");
      personalInfoMissing = true;
      if (!firstErrorField) firstErrorField = phone;
    }

    if (personalInfoMissing) {
      missingFields.push("Personal Information");
      isValid = false;
    }

    // Professional Summary
    if (summary.value.trim() === "") {
      showError("summary", "Professional summary is required");
      missingFields.push("Professional Summary");
      if (!firstErrorField) firstErrorField = summary;
      isValid = false;
    }

    // Education - At least one complete entry
    const eduInstitution = document.getElementById("edu-institution-0");
    const eduLocation = document.getElementById("edu-location-0");
    const eduDegree = document.getElementById("edu-degree-0");
    const eduYear = document.getElementById("edu-year-0");

    if (
      !eduInstitution.value.trim() ||
      !eduLocation.value.trim() ||
      !eduDegree.value.trim() ||
      !eduYear.value.trim()
    ) {
      missingFields.push("Education");
      if (!firstErrorField) firstErrorField = eduInstitution;
      isValid = false;
    }

    // Skills - At least one category
    const skillCategory = document.getElementById("skill-category-0");
    const skillItems = document.getElementById("skill-items-0");

    if (!skillCategory.value.trim() || !skillItems.value.trim()) {
      missingFields.push("Skills");
      if (!firstErrorField) firstErrorField = skillCategory;
      isValid = false;
    }

    // If there are missing fields, show ONE alert with all missing sections
    if (!isValid) {
      alert(
        "Please complete the following required sections:\n\n• " +
          missingFields.join("\n• ")
      );

      // Scroll to the first error field
      if (firstErrorField) {
        firstErrorField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstErrorField.focus();
      }
    }

    return isValid;
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + "-error");

    field.classList.add("error");
    errorSpan.textContent = message;
    errorSpan.classList.add("show");
  }

  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => {
      error.classList.remove("show");
      error.textContent = "";
    });

    const errorFields = document.querySelectorAll(".error");
    errorFields.forEach((field) => field.classList.remove("error"));
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generate CV Preview
  function generateCVPreview() {
    const formData = new FormData(form);

    let html = `
      <section class="cv-header">
        <h1>${escapeHtml(formData.get("fullName"))}</h1>
        <p class="cv-title">${escapeHtml(formData.get("title"))}</p>
        <div class="contact-info">
          <div class="contact-item">
            <a href="mailto:${escapeHtml(formData.get("email"))}">${escapeHtml(
      formData.get("email")
    )}</a>
          </div>
          <div class="contact-item">
            <span>${escapeHtml(formData.get("phone"))}</span>
          </div>
    `;

    if (formData.get("linkedin")) {
      html += `
          <div class="contact-item">
            <a href="${escapeHtml(
              formData.get("linkedin")
            )}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
      `;
    }

    if (formData.get("github")) {
      html += `
          <div class="contact-item">
            <a href="${escapeHtml(
              formData.get("github")
            )}" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
      `;
    }

    html += `
        </div>
      </section>
    `;

    // Professional Summary
    html += `
      <section class="cv-section">
        <h2>Professional Summary</h2>
        <p>${escapeHtml(formData.get("summary"))}</p>
      </section>
    `;

    // Education
    html += generateEducationSection(formData);

    // Experience (if any)
    const experienceHtml = generateExperienceSection(formData);
    if (experienceHtml) {
      html += experienceHtml;
    }

    // Skills
    html += generateSkillsSection(formData);

    // Projects (if any)
    const projectsHtml = generateProjectsSection(formData);
    if (projectsHtml) {
      html += projectsHtml;
    }

    // Certifications (if any)
    const certificationsHtml = generateCertificationsSection(formData);
    if (certificationsHtml) {
      html += certificationsHtml;
    }

    // Interests (if provided)
    if (formData.get("interests") && formData.get("interests").trim() !== "") {
      html += `
        <section class="cv-section">
          <h2>Interests</h2>
          <p>${escapeHtml(formData.get("interests"))}</p>
        </section>
      `;
    }

    cvPreview.innerHTML = html;
  }

  function generateEducationSection(formData) {
    let html = `<section class="cv-section"><h2>Education</h2>`;

    for (let i = 0; i < educationCount; i++) {
      const institution = formData.get(`edu-institution-${i}`);
      if (!institution || institution.trim() === "") continue;

      html += `
        <div class="education-item">
          <div class="education-header">
            <h3>${escapeHtml(institution)}</h3>
            <span class="location">${escapeHtml(
              formData.get(`edu-location-${i}`)
            )}</span>
          </div>
          <div class="education-details">
            <p class="degree">${escapeHtml(formData.get(`edu-degree-${i}`))}</p>
            <div class="education-meta">
              <span>${escapeHtml(formData.get(`edu-year-${i}`))}</span>
      `;

      if (formData.get(`edu-gpa-${i}`)) {
        html += `<span class="gpa">GPA: ${escapeHtml(
          formData.get(`edu-gpa-${i}`)
        )}</span>`;
      }

      html += `</div>`;

      if (formData.get(`edu-activities-${i}`)) {
        html += `<p class="activities"><strong>Activities:</strong> ${escapeHtml(
          formData.get(`edu-activities-${i}`)
        )}</p>`;
      }

      html += `</div></div>`;
    }

    html += `</section>`;
    return html;
  }

  function generateExperienceSection(formData) {
    let html = "";
    let hasExperience = false;

    for (let i = 0; i < experienceCount; i++) {
      const company = formData.get(`exp-company-${i}`);
      if (company && company.trim() !== "") {
        if (!hasExperience) {
          html = `<section class="cv-section"><h2>Experience</h2>`;
          hasExperience = true;
        }

        html += `
          <div class="education-item">
            <div class="education-header">
              <h3>${escapeHtml(company)}</h3>
              <span class="location">${escapeHtml(
                formData.get(`exp-location-${i}`) || ""
              )}</span>
            </div>
            <div class="education-details">
              <p class="degree">${escapeHtml(
                formData.get(`exp-position-${i}`) || ""
              )}</p>
              <div class="education-meta">
                <span>${escapeHtml(
                  formData.get(`exp-period-${i}`) || ""
                )}</span>
              </div>
        `;

        if (formData.get(`exp-description-${i}`)) {
          html += `<p style="margin-top: 0.5rem;">${escapeHtml(
            formData.get(`exp-description-${i}`)
          )}</p>`;
        }

        html += `</div></div>`;
      }
    }

    if (hasExperience) {
      html += `</section>`;
    }

    return html;
  }

  function generateSkillsSection(formData) {
    let html = `<section class="cv-section"><h2>Skills</h2><div class="skills-grid">`;

    for (let i = 0; i < skillCategoryCount; i++) {
      const category = formData.get(`skill-category-${i}`);
      const items = formData.get(`skill-items-${i}`);

      if (!category || category.trim() === "" || !items || items.trim() === "")
        continue;

      html += `
        <div class="skill-category">
          <h3>${escapeHtml(category)}</h3>
          <ul>
      `;

      const skillArray = items
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
      skillArray.forEach((skill) => {
        html += `<li>${escapeHtml(skill)}</li>`;
      });

      html += `</ul></div>`;
    }

    html += `</div></section>`;
    return html;
  }

  function generateProjectsSection(formData) {
    let html = "";
    let hasProjects = false;

    for (let i = 0; i < projectCount; i++) {
      const projectName = formData.get(`project-name-${i}`);
      if (projectName && projectName.trim() !== "") {
        if (!hasProjects) {
          html = `<section class="cv-section"><h2>Projects</h2>`;
          hasProjects = true;
        }

        html += `
          <div class="project-item">
            <h3>${escapeHtml(projectName)}</h3>
        `;

        if (formData.get(`project-description-${i}`)) {
          html += `<p>${escapeHtml(
            formData.get(`project-description-${i}`)
          )}</p>`;
        }

        html += `</div>`;
      }
    }

    if (hasProjects) {
      html += `</section>`;
    }

    return html;
  }

  function generateCertificationsSection(formData) {
    let html = "";
    let hasCertifications = false;

    for (let i = 0; i < certificationCount; i++) {
      const certName = formData.get(`cert-name-${i}`);
      if (certName && certName.trim() !== "") {
        if (!hasCertifications) {
          html = `<section class="cv-section"><h2>Certifications</h2>`;
          hasCertifications = true;
        }

        html += `
          <div class="project-item">
            <h3>${escapeHtml(certName)}</h3>
            <p>
        `;

        if (formData.get(`cert-issuer-${i}`)) {
          html += `<strong>Issuer:</strong> ${escapeHtml(
            formData.get(`cert-issuer-${i}`)
          )}`;
        }

        if (formData.get(`cert-year-${i}`)) {
          if (formData.get(`cert-issuer-${i}`)) html += " | ";
          html += `<strong>Year:</strong> ${escapeHtml(
            formData.get(`cert-year-${i}`)
          )}`;
        }

        html += `</p></div>`;
      }
    }

    if (hasCertifications) {
      html += `</section>`;
    }

    return html;
  }

  // Helper function to escape HTML
  function escapeHtml(text) {
    if (!text) return "";
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  // Template Creators
  function createEducationEntry(index) {
    return `
      <div class="education-entry">
        ${
          index > 0
            ? '<button type="button" class="remove-btn">Remove</button>'
            : ""
        }
        <div class="form-row">
          <div class="form-group">
            <label for="edu-institution-${index}">Institution <span class="required">*</span></label>
            <input type="text" id="edu-institution-${index}" name="edu-institution-${index}" ${index === 0 ? "required" : ""} placeholder="University Name">
          </div>
          <div class="form-group">
            <label for="edu-location-${index}">Location <span class="required">*</span></label>
            <input type="text" id="edu-location-${index}" name="edu-location-${index}" ${index === 0 ? "required" : ""} placeholder="City, Country">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="edu-degree-${index}">Degree <span class="required">*</span></label>
            <input type="text" id="edu-degree-${index}" name="edu-degree-${index}" ${index === 0 ? "required" : ""} placeholder="Bachelor of Engineering in Computer Engineering">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="edu-year-${index}">Year/Period <span class="required">*</span></label>
            <input type="text" id="edu-year-${index}" name="edu-year-${index}" ${index === 0 ? "required" : ""} placeholder="2024-2028 or Graduated: 2024">
          </div>
          <div class="form-group">
            <label for="edu-gpa-${index}">GPA</label>
            <input type="text" id="edu-gpa-${index}" name="edu-gpa-${index}" placeholder="3.8 / 4.0">
          </div>
        </div>
        <div class="form-group">
          <label for="edu-activities-${index}">Activities/Honors</label>
          <textarea id="edu-activities-${index}" name="edu-activities-${index}" rows="2" placeholder="IEEE Student Member, Dean's List, etc."></textarea>
        </div>
      </div>
    `;
  }

  function createExperienceEntry(index) {
    return `
      <div class="experience-entry">
        ${
          index > 0
            ? '<button type="button" class="remove-btn">Remove</button>'
            : ""
        }
        <div class="form-row">
          <div class="form-group">
            <label for="exp-company-${index}">Company</label>
            <input type="text" id="exp-company-${index}" name="exp-company-${index}" placeholder="Company Name">
          </div>
          <div class="form-group">
            <label for="exp-location-${index}">Location</label>
            <input type="text" id="exp-location-${index}" name="exp-location-${index}" placeholder="City, Country">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="exp-position-${index}">Position</label>
            <input type="text" id="exp-position-${index}" name="exp-position-${index}" placeholder="Software Engineer Intern">
          </div>
          <div class="form-group">
            <label for="exp-period-${index}">Period</label>
            <input type="text" id="exp-period-${index}" name="exp-period-${index}" placeholder="June 2024 - August 2024">
          </div>
        </div>
        <div class="form-group">
          <label for="exp-description-${index}">Description</label>
          <textarea id="exp-description-${index}" name="exp-description-${index}" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
      </div>
    `;
  }

  function createSkillCategoryEntry(index) {
    return `
      <div class="skill-category-entry">
        ${
          index > 0
            ? '<button type="button" class="remove-btn">Remove</button>'
            : ""
        }
        <div class="form-row">
          <div class="form-group">
            <label for="skill-category-${index}">Category <span class="required">*</span></label>
            <input type="text" id="skill-category-${index}" name="skill-category-${index}" ${index === 0 ? "required" : ""} placeholder="e.g., Programming Languages">
          </div>
        </div>
        <div class="form-group">
          <label for="skill-items-${index}">Skills (comma-separated) <span class="required">*</span></label>
          <textarea id="skill-items-${index}" name="skill-items-${index}" rows="2" ${index === 0 ? "required" : ""} placeholder="Java, Python, C++"></textarea>
        </div>
      </div>
    `;
  }

  function createProjectEntry(index) {
    return `
      <div class="project-entry">
        ${
          index > 0
            ? '<button type="button" class="remove-btn">Remove</button>'
            : ""
        }
        <div class="form-group">
          <label for="project-name-${index}">Project Name</label>
          <input type="text" id="project-name-${index}" name="project-name-${index}" placeholder="Project Title">
        </div>
        <div class="form-group">
          <label for="project-description-${index}">Description</label>
          <textarea id="project-description-${index}" name="project-description-${index}" rows="3" placeholder="Describe the project, technologies used, and your role..."></textarea>
        </div>
      </div>
    `;
  }

  function createCertificationEntry(index) {
    return `
      <div class="certification-entry">
        ${
          index > 0
            ? '<button type="button" class="remove-btn">Remove</button>'
            : ""
        }
        <div class="form-row">
          <div class="form-group">
            <label for="cert-name-${index}">Certification Name</label>
            <input type="text" id="cert-name-${index}" name="cert-name-${index}" placeholder="e.g., AWS Certified Developer">
          </div>
          <div class="form-group">
            <label for="cert-issuer-${index}">Issuer</label>
            <input type="text" id="cert-issuer-${index}" name="cert-issuer-${index}" placeholder="e.g., Amazon Web Services">
          </div>
        </div>
        <div class="form-group">
          <label for="cert-year-${index}">Year</label>
          <input type="text" id="cert-year-${index}" name="cert-year-${index}" placeholder="2024">
        </div>
      </div>
    `;
  }
});
