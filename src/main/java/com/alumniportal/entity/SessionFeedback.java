package com.alumniportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "session_feedback")
public class SessionFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private MentorshipSession session;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    private Integer rating;

    @Column(length = 1000)
    private String comments;

    public SessionFeedback() {
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public MentorshipSession getSession() {
        return session;
    }

    public void setSession(MentorshipSession session) {
        this.session = session;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
