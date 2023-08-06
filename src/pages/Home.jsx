import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Container, TextField, Button, Paper, Box, Divider } from '@mui/material';
function Home() {
    const [categories, setCategories] = useState(['text', 'Checkbox', 'Underline']);
    const [questions, setQuestions] = useState([]);
console.log(questions);
  const handleAddQuestion = () => {
    setQuestions([...questions, { type: 'categorized', options: [], category: '' }]);
  };

  const handleAddCategory = () => {
    setCategories([...categories, `Category ${categories.length + 1}`]);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCategoryChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].category = value;
    setQuestions(updatedQuestions);
  };
  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = value;
    setQuestions(updatedQuestions);
  };
  const data ={
    "question": questions,
    "options":questions.options,
    
}
  

  return (
    <>
         <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Form Editor</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <Typography variant="h5" gutterBottom>
          Form Editor
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddQuestion}>
          Add Question
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddCategory} style={{ marginLeft: '10px' }}>
          Add Category
        </Button>
        <Divider style={{ margin: '20px 0' }} />
        {questions.map((question, index) => (
          <Box key={index} mb={2}  padding={2}>
            {question.type === 'categorized' && (
              <>
                <TextField
                  label="Question Text"
                  fullWidth
                  margin="normal"
                  multiline
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <Typography variant="subtitle1">Category:</Typography>
                <select
                  value={question.category}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
            {  question.category!=="text"?<Typography variant="subtitle1" >Options:</Typography>:<></>} 
                {question.category!=="text"&&question&&question.options.map((option, optionIndex) => (
                    
                  <div key={optionIndex}>
                    <TextField
                      label={`Option ${optionIndex + 1}`}
                      fullWidth
                      margin="normal"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                    
                    <Divider style={{ margin: '10px 0' }} />
                  </div>
                ))}
           {  question.category!=="text"?<Button variant="outlined" color="primary" onClick={() => handleAddOption(index)}>
                      Add Option
                    </Button>:<></>}
              </>
            )}
            {/* Add other question types here (fill-in-the-blank, MCQ) */}
          </Box>
        ))}
        <Button variant="contained" color="primary">
          Save to MongoDB
        </Button>
      </Container>
     
    </>
  )
}

export default Home