package com.cb.packingplans.exceptions;

public class DuplicateLocationException extends RuntimeException {
    public DuplicateLocationException(String message) {
        super(message);
    }
}
