package com.zenveus.backend.advisor;

import com.zenveus.backend.util.ResponseUtil;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWiseExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseUtil handleException(Exception e) {
        return new ResponseUtil(500, "Internal Server Error", e.getMessage());
    }
}
