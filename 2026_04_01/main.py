class Student():
    def __init__(self, id, name, surname, age):
        self.id = id
        self.name = name
        self.surname = surname
        self.age = age
        self.courses = []

    def add_course(self, course_name: str):
        self.courses.append(course_name)

class Course():
    studentId = 0
    courseName = ""
    def __init__(self, studentId, courseName):
        self.studentId = studentId
        self.courseName = courseName

fStudent = open("students.txt","r")
fCourse = open("courses.txt","r")

students = {}

courseList = []



for line in fStudent:
    line = line.strip().split(",")
    s = Student(line[0], line[1], line[2], line[3])
    students[s.id] = s


for line in fCourse:
    line = line.strip().split(",")
    student_id = line[0]
    course_name = line[1]

    if student_id in students:
        students[student_id].add_course(course_name)

for student in students.values():
    courses_str = ", ".join(student.courses)
    print(f"{student.name} {student.surname} ({student.age} lat): {courses_str}")

for student in students.values():
    filename = f"{student.name.lower()}_{student.surname.lower()}.txt"

    with open(filename, "w") as f:
        f.write("Kursy:\n")
        for course in student.courses:
            f.write(f"- {course},\n")