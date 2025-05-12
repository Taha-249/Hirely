import styles from './UserFields.module.css';

const jobTypeOptions = ['Full-time', 'Part-time', 'Internship', 'Freelance'];
const interestOptions = ['AI', 'Web Dev', 'Data Science', 'Marketing', 'Finance'];

export default function UserFields({
  jobTypes, setJobTypes,
  degree, setDegree,
  experienceLevel, setExperienceLevel,
  skills, setSkills,
  location, setLocation,
  interests, setInterests,
  handleCheckbox
}) {
  return (
    <>
      <div className={styles.inputGroup}>
        <label>Preferred Job Types:</label>
        <div className={styles.checkboxGroup}>
          {jobTypeOptions.map(type => (
            <label key={type}>
              <input
                type="checkbox"
                checked={jobTypes.includes(type)}
                onChange={() => handleCheckbox(type, jobTypes, setJobTypes)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Highest Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <select
          className={styles.select}
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="Fresher">Fresher</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
          <option value="Lead">Lead</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Preferred Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Interests:</label>
        <div className={styles.checkboxGroup}>
          {interestOptions.map(interest => (
            <label key={interest}>
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => handleCheckbox(interest, interests, setInterests)}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
