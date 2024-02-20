const express = require('express');
const router = express.Router();
const {
    createIssue,
    getIssueDetails,
    updateIssueStatus,
    listAllIssues,
    deleteIssue,
} = require('../controllers/issueController');

// Create a new issue
router.post('/', createIssue);

// Get issue details
router.get('/:issueId', getIssueDetails);

// Update an issue status
router.put('/:issueId/status', updateIssueStatus);

// List all issues
router.get('/', listAllIssues);

// Delete an issue (if applicable)
router.delete('/:issueId', deleteIssue);

module.exports = router;
