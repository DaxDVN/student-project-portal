package com.group1.studentprojectportal.util;

import com.group1.studentprojectportal.constant.AppContants;

public class PaginationChecking {
    public static void validatePageNumberAndSize(int page, int size) throws Exception {
        if (page < 0) {
            throw new Exception("Page number cannot be less than zero.");
        }

        if (size < 0) {
            throw new Exception("Size number cannot be less than zero.");
        }

        if (size > AppContants.MAX_PAGE_SIZE) {
            throw new Exception("Page size must not be greater than " + AppContants.MAX_PAGE_SIZE);
        }
    }
}
