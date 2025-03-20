package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.ReportDTO;
import com.zenveus.backend.entity.Report;
import com.zenveus.backend.repository.ReportRepository;
import com.zenveus.backend.service.ReportService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReportDTO createReport(ReportDTO reportDTO) {
        Report report = modelMapper.map(reportDTO, Report.class);
        report = reportRepository.save(report);
        return modelMapper.map(report, ReportDTO.class);
    }

    @Override
    public ReportDTO getReportById(String id) {
        Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
        return modelMapper.map(report, ReportDTO.class);
    }

    @Override
    public List<ReportDTO> getAllReports() {
        return reportRepository.findAll().stream()
                .map(report -> modelMapper.map(report, ReportDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReportDTO updateReport(String id, ReportDTO reportDTO) {
        Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
        modelMapper.map(reportDTO, report);
        report = reportRepository.save(report);
        return modelMapper.map(report, ReportDTO.class);
    }

    @Override
    public void deleteReport(String id) {
        reportRepository.deleteById(id);
    }
}