import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { taskService } from '../services/taskService';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import FormGroup from '../components/FormGroup';
import { useAuth } from '../context/authContext';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  effort: Yup.number().min(1).required('Effort in days is required'),
  dueDate: Yup.date().required('Due date is required')
});

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    effort: '',
    dueDate: ''
  });

  useEffect(() => {
    if (id) {
      const task = taskService.getById(parseInt(id));
      if (task && task.userId === currentUser.id) {
        setInitialValues({
          title: task.title,
          description: task.description,
          effort: task.effort_days,
          dueDate: task.due_date
        });
      } else {
        setError('Task not found or access denied');
      }
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      effort_days: values.effort,
      due_date: values.dueDate,
      userId: currentUser.id
    };

    try {
      if (id) {
        taskService.update(parseInt(id), payload);
      } else {
        taskService.create(payload);
      }
      navigate('/tasks');
    } catch (err) {
      setError('Failed to save task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow p-4">
            <h3 className="text-center mb-3">{id ? 'Edit Task' : 'Create Task'}</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={TaskSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
                <Form>
                  <FormGroup name="title" label="Title" {...{ values, errors, touched, handleChange, handleBlur }} />
                  <FormGroup name="description" label="Description" type="textarea" {...{ values, errors, touched, handleChange, handleBlur }} />
                  <FormGroup name="effort" label="Effort to Complete (Days)" type="number" {...{ values, errors, touched, handleChange, handleBlur }} />
                  <FormGroup name="dueDate" label="Due Date" type="date" {...{ values, errors, touched, handleChange, handleBlur }} />
                  <Button type="submit" disabled={isSubmitting} className="mt-3 w-100">
                    {isSubmitting ? 'Saving...' : id ? 'Update Task' : 'Create Task'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskForm;
