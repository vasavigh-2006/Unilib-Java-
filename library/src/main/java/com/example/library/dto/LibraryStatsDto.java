package com.example.library.dto;

public class LibraryStatsDto {
    private long totalTitles;
    private long totalCopies;
    private long availableCopies;
    private long activeBorrows;
    private long overdueBorrows;
    private double totalFinesCollected;
    private double pendingFinesDue;

    public LibraryStatsDto() {}

    public LibraryStatsDto(long totalTitles, long totalCopies, long availableCopies, long activeBorrows, long overdueBorrows, double totalFinesCollected, double pendingFinesDue) {
        this.totalTitles = totalTitles;
        this.totalCopies = totalCopies;
        this.availableCopies = availableCopies;
        this.activeBorrows = activeBorrows;
        this.overdueBorrows = overdueBorrows;
        this.totalFinesCollected = totalFinesCollected;
        this.pendingFinesDue = pendingFinesDue;
    }

    public long getTotalTitles() {
        return totalTitles;
    }

    public void setTotalTitles(long totalTitles) {
        this.totalTitles = totalTitles;
    }

    public long getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(long totalCopies) {
        this.totalCopies = totalCopies;
    }

    public long getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(long availableCopies) {
        this.availableCopies = availableCopies;
    }

    public long getActiveBorrows() {
        return activeBorrows;
    }

    public void setActiveBorrows(long activeBorrows) {
        this.activeBorrows = activeBorrows;
    }

    public long getOverdueBorrows() {
        return overdueBorrows;
    }

    public void setOverdueBorrows(long overdueBorrows) {
        this.overdueBorrows = overdueBorrows;
    }

    public double getTotalFinesCollected() {
        return totalFinesCollected;
    }

    public void setTotalFinesCollected(double totalFinesCollected) {
        this.totalFinesCollected = totalFinesCollected;
    }

    public double getPendingFinesDue() {
        return pendingFinesDue;
    }

    public void setPendingFinesDue(double pendingFinesDue) {
        this.pendingFinesDue = pendingFinesDue;
    }
}
