# Database Documentation for ServiMatch

## Overview

This document describes the database schema for the ServiMatch platform, which connects service issuers with contractors. The platform facilitates the posting and bidding of services, communication between users, and provides feedback mechanisms.

## Models

### User

-   **id**: UUID - Unique identifier for the user.
-   **email**: String - User's email address, unique across the platform.
-   **password**: String - Hashed password for user authentication.
-   **name**: String? - Optional name of the user.
-   **roles**: Role[] - Roles associated with the user.
-   **bids**: Bid[] - Bids posted by the user (if issuer).
-   **applications**: Application[] - Applications to bids (if contractor).
-   **sentMessages**: Message[] @relation("MessageSender") - Messages sent by the user.
-   **receivedMessages**: Message[] @relation("MessageReceiver") - Messages received by the user.
-   **authoredReviews**: Review[] @relation("ReviewAuthor") - Reviews authored by the user.
-   **subjectReviews**: Review[] @relation("ReviewSubject") - Reviews about the user.

### Role

-   **id**: UUID - Unique identifier for the role.
-   **name**: String - Name of the role.

### Bid

-   **id**: UUID - Unique identifier for the bid.
-   **title**: String - Title of the bid.
-   **description**: String - Detailed description of the service needed.
-   **status**: BidStatus - Current status of the bid (OPEN, CLOSED, IN_PROGRESS, COMPLETED).
-   **issuerId**: UUID - Identifier for the user who issued the bid.
-   **createdAt**: DateTime - Timestamp when the bid was created.
-   **updatedAt**: DateTime - Timestamp when the bid was last updated.

### Application

-   **id**: UUID - Unique identifier for the application.
-   **bidId**: UUID - Identifier for the bid being applied to.
-   **vendorId**: UUID - Identifier for the user (contractor) applying.
-   **status**: AppStatus - Status of the application (PENDING, ACCEPTED, REJECTED).
-   **createdAt**: DateTime - Timestamp when the application was created.
-   **updatedAt**: DateTime - Timestamp when the application was last updated.

### Message

-   **id**: UUID - Unique identifier for the message.
-   **content**: String - Content of the message.
-   **senderId**: UUID - Identifier for the sender of the message.
-   **receiverId**: UUID - Identifier for the receiver of the message.
-   **createdAt**: DateTime - Timestamp when the message was sent.

### Review

-   **id**: UUID - Unique identifier for the review.
-   **content**: String - Content of the review.
-   **rating**: Int - Rating given in the review.
-   **authorId**: UUID - Identifier for the author of the review.
-   **subjectId**: UUID - Identifier for the subject of the review.
-   **createdAt**: DateTime - Timestamp when the review was created.

### Notification

-   **id**: UUID - Unique identifier for the notification.
-   **content**: String - Content of the notification.
-   **userId**: UUID - Identifier for the user the notification is for.
-   **createdAt**: DateTime - Timestamp when the notification was created.

## Enums

### BidStatus

-   Represents the current status of a bid: OPEN, CLOSED, IN_PROGRESS, COMPLETED.

### AppStatus

-   Represents the current status of an application: PENDING, ACCEPTED, REJECTED.
