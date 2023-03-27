import React from 'react'

const Form = ({ formRef, onSubmit }) => {
  return (
    <div className="form">
      <h3>the Form</h3>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="control">
          <input type="text" name="firstName" placeholder="firstName" />
          <input type="text" name="lastName" placeholder="lastName" />
        </div>
        <div className="control">
          <select name="gender">
            <option value={null}>gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div>
            <input type="date" name="dateOfBirth" />
          </div>
        </div>
        <label>Address:</label>
        <div className="control">
          <input type="text" name="address.street1" placeholder="address.street1" />
          <input type="text" name="address.street2" placeholder="address.street2" />
        </div>
        <div className="control">
          <input type="text" name="address.postalCode" placeholder="address.postalCode" />
          <input type="text" name="address.city" placeholder="address.city" />
        </div>
        <div className="control">
          <div className="checkradio">
            <label>hobbies:</label>
            <label>
              <input type="checkbox" name="test.something.hobbies" value="guitar" />
              <span>guitar</span>
            </label>
            <label>
              <input type="checkbox" name="test.something.hobbies" value="swimming" />
              <span>swimming</span>
            </label>
          </div>
          <div className="checkradio">
            <label>radio (data-type=number)</label>
            <label>
              <span>0</span>
              <input type="radio" data-type="number" name="test.radioNumber" value={0} />
            </label>
            <label>
              <span>1</span>
              <input type="radio" data-type="number" name="test.radioNumber" value={1} />
            </label>
            <label>
              <span>2</span>
              <input type="radio" data-type="number" name="test.radioNumber" value={2} />
            </label>
          </div>
        </div>
        <div className="control">
          <select name="selectMulti" multiple>
            <option value="green">green</option>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
            <option value="blue">blue</option>
          </select>
        </div>

        <div className="control">
          <div className="checkradio">
            <label>
              <span>checkBoolean</span>
              <input type="checkbox" name="checkBoolean" />
            </label>
          </div>
          <div className="checkradio">
            <label>
              <span>radioBoolean</span>
              <label>
                <input type="radio" name="radioBoolean" value={true} />
                <span>true</span>
              </label>
              <label>
                <input type="radio" name="radioBoolean" value={false} />
                <span>false</span>
              </label>
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
