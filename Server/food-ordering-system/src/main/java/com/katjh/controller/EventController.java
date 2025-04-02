package com.katjh.controller;

import com.katjh.model.Events;
import com.katjh.response.ApiResponse;
import com.katjh.service.EventsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EventController {

    private final EventsService eventService;

    @PostMapping("/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<Events> createEvents(@RequestBody Events event,
                                               @PathVariable Long restaurantId) throws Exception {
        Events createdEvents=eventService.createEvent(event, restaurantId);
        return new ResponseEntity<>(createdEvents, HttpStatus.ACCEPTED);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Events>> findAllEvents() throws Exception{
        List<Events> events=eventService.findAllEvent();
        return new ResponseEntity<>(events,HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<List<Events>> findRestaurantsEvents(
            @PathVariable Long restaurantId) throws Exception{
        List<Events> events=eventService.findRestaurantsEvent(restaurantId);
        return new ResponseEntity<>(events,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/admin/events/{id}")
    public ResponseEntity<ApiResponse> deleteEvents(
            @PathVariable Long id) throws Exception{
        eventService.deleteEvent(id);
        ApiResponse res=new ApiResponse("Events Deleted",true);
        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }
}
