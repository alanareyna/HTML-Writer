/*
* Modified by: Alana Reyna
*/
const cs_schedule = require('./courses_departmentView_2223_ComputerScience.json');
const top = require('./top.js');
const bottom = require('./bottom');

const courseObjectToArrayOfCourseObjects = (courseObject) => {
    return Object.keys(courseObject).sort().filter(key => !key.match(/CS-101/)).map(key => cs_schedule[key]);
}

const multiRowDataForCourse = (course) => {
    const subject_catalog = (course) =>
        `${course['subject']} ${course['catalog']}`;
    const title = course => course['course_title'];
    const units = course => course['units'];

    const numComponents = course.components.length;

    return [subject_catalog, title, units].map(func => `<td rowspan=${numComponents}>${func(course)}</td>`);
}

const rowDataForComponent = (componentObject) => {
    const section = () => componentObject['section'];
    const componentName = () => componentObject.component;

    const instructor = () => {
        const firstInstructor = componentObject['instructors'][0];
        if (firstInstructor['instructor_lName'] == null){
            return " ";
        }
        else {
            return `${firstInstructor['instructor_lName']}, ${firstInstructor['instructor_fName']}`;
        }
    }
    const meeting_pattern = () => componentObject['meeting_pattern'][0]['meeting_pattern'];

    const start_time = () => {
        if (componentObject['meeting_pattern'][0]['start_time'] == null){
            return " ";
        }
        else {
            return componentObject['meeting_pattern'][0]['start_time'];
        }
    }
    const end_time = () => {
        if (componentObject['meeting_pattern'][0]['end_time'] == null){
            return " ";
        }
        else {
            return componentObject['meeting_pattern'][0]['end_time'];
        }
    }
    const classroom = () => {
        if (componentObject['meeting_pattern'][0]['facility_name'] == null){
            return " ";
        }
        else {
            return componentObject['meeting_pattern'][0]['facility_name'];
        }
    }

    const componentFunctions = [section, componentName, instructor, meeting_pattern, start_time, end_time, classroom];

    return componentFunctions.map(func => `<td>${func()}</td>`);
}

const printRowDataForCourse = (course) => {
    const multiLineValues = multiRowDataForCourse(course);
    for(let i = 0; i < course.components.length; i += 1){
        console.log('<tr>')
        let rowData = rowDataForComponent(course[course.components[i]]);
        if (i === 0)
            rowData = [...multiLineValues, ...rowData];
        console.log(rowData.join(""));
        console.log('</tr>');
    }
}

const arrayOfObjects = courseObjectToArrayOfCourseObjects(cs_schedule);

console.log(top());
console.log('<table>');
console.log('<tr>');
console.log('<td>', 'Course', '</td>');
console.log('<td>', 'Title', '</td>');
console.log('<td>', 'Units', '</td>');
console.log('<td>', 'Section', '</td>');
console.log('<td>', 'Component', '</td>');
console.log('<td>', 'Instructor', '</td>');
console.log('<td>', 'Meeting Pattern', '</td>');
console.log('<td>', 'Start Time', '</td>');
console.log('<td>', 'End Time', '</td>');
console.log('<td>', 'Classroom', '</td>');
console.log('</tr>');

for (let i = 0; i < arrayOfObjects.length; i++){
    printRowDataForCourse(arrayOfObjects[i][0]);
}
console.log('</table>')
console.log(bottom());

