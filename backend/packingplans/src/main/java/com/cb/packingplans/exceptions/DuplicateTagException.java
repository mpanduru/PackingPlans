package com.cb.packingplans.exceptions;

public class DuplicateTagException extends RuntimeException {
    public DuplicateTagException(String message) {
        super(message);
    }
}
