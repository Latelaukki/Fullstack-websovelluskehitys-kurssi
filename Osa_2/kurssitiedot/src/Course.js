const Header = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
  } 

  const Total = ({ parts }) => {
    const sum = parts.reduce((s,part) =>  s = s + part.exercises , 0 )

    return (
      <div>
        <p>
          <b>total of {sum} exercises</b>
        </p>
      </div>
    )
  }

  const Course = ({ course }) => {
    const parts = course.parts

    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }
  export default Course
