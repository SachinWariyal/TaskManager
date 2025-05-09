import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Alert, Badge, Modal, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { useAuth } from '../context/authContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    try {
      setLoading(true);
      const data = taskService.getAll(currentUser.id);
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    try {
      taskService.remove(taskToDelete.id);
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      setShowDeleteModal(false);
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleExport = () => {
    const userTasks = taskService.getAll(currentUser.id);
    const worksheet = XLSX.utils.json_to_sheet(userTasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'tasks.xlsx');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      taskService.bulkImport(data, currentUser.id);
      setTasks(taskService.getAll(currentUser.id));
    };
    reader.readAsBinaryString(file);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const getDueDateStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today ? <Badge bg="danger">Overdue</Badge> : <Badge bg="success">Upcoming</Badge>;
  };

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col><h2>My Tasks</h2></Col>
        <Col className="text-end">
          <Button as={Link} to="/tasks/new" variant="primary">+ New Task</Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3">
        <Col>
          <Button onClick={handleExport} className="me-2" variant="success">Export Tasks to Excel</Button>
          <Form.Control
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleImport}
            className="d-inline w-auto"
          />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Effort (Days)</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No tasks found.</td></tr>
            ) : (
              tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.effort_days}</td>
                  <td>{formatDate(task.due_date)}</td>
                  <td>{getDueDateStatus(task.due_date)}</td>
                  <td>
                    <Button as={Link} to={`/tasks/edit/${task.id}`} variant="warning" size="sm" className="me-2">Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => confirmDelete(task)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Delete Task</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskList;