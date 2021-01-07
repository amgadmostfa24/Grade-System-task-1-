let yargs = require("yargs");

const fs = require("fs");

const loadStudents = () => {
  try {
    const defualtStudentsbuffer = fs
      .readFileSync("studentsgrades.json")
      .toString();
    return JSON.parse(defualtStudentsbuffer);
  } catch (e) {
    return [];
  }
};

const saveStudents = (student) => {
  const dataJson = JSON.stringify(student);
  fs.writeFileSync("studentsgrades.json", dataJson);
};

const add = (studentss) => {
  const defualtStudents = loadStudents();
  const finded = defualtStudents.find((student) => student.id === studentss.id);
  if (finded === undefined) {
    defualtStudents.push({
      Sname: studentss.Sname,
      id: studentss.id,
      grade: studentss.grade,
      comment: studentss.comment,
    });
    saveStudents(defualtStudents);
  } else {
    console.log("this student exists");
  }
};

const deleteStudent = (studentId) => {
  const defualtStudents = loadStudents();
  const finded = defualtStudents.find((student) => student.id === studentId);
  if (finded !== undefined) {
    const studentToKeep = defualtStudents.filter(
      (student) => student.id !== studentId
    );
    saveStudents(studentToKeep);
    console.log("student has been deleted");
  } else {
    console.log("this student doesn't exist");
  }
};

const list = () => {
  const defualtStudents = loadStudents();
  if (defualtStudents.length !== 0) {
    defualtStudents.forEach((student) => {
      console.log(student.Sname);
      console.log(student.grade);
    });
  } else {
    console.log("the school is empty hahhahahhahahah ");
  }
};

const read = (studentId) => {
  const defualtStudents = loadStudents();
  const finded = defualtStudents.find((student) => student.id === studentId);
  if (finded !== undefined) {
    console.log(finded);
  } else {
    console.log("there is no student with this id 2df3 almsarif nihaaaaa");
  }
};

yargs.command({
  command: "add",
  desctibe: "Add student name,id,grade,comment",
  builder: {
    Sname: {
      type: "string",
      demandOption: true,
    },
    id: {
      type: "number",
      demandOption: true,
    },
    grade: {
      type: "number",
      demandOption: true,
    },
    comment: {
      type: "string",
    },
  },
  handler: function (argv) {
    add(argv);
  },
});

yargs.command({
  command: "delete",
  desctibe: "delete student",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
  },
  handler: function (argv) {
    deleteStudent(argv.id);
  },
});

yargs.command({
  command: "read",
  desctibe: "read student name,id,grade,comment",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
  },
  handler: function (argv) {
    read(argv.id);
  },
});

yargs.command({
  command: "list",
  desctibe: "Add student name,id,grade,comment",
  handler: function (argv) {
    list();
  },
});

yargs.parse();
