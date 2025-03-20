package com.zenveus.backend.service;

import com.zenveus.backend.dto.ReportDTO;

import java.util.List;

public interface ReportService {
    ReportDTO createReport(ReportDTO reportDTO);
    ReportDTO getReportById(String id);
    List<ReportDTO> getAllReports();
    ReportDTO updateReport(String id, ReportDTO reportDTO);
    void deleteReport(String id);
}
