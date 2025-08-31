package com.cozycorner.restaurant.controller;

import com.cozycorner.restaurant.entity.MenuItem;
import com.cozycorner.restaurant.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    // Public endpoint - Get all available menu items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemRepository.findAllAvailableItems();
        return ResponseEntity.ok(menuItems);
    }

    // Public endpoint - Get menu items by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable MenuItem.Category category) {
        List<MenuItem> menuItems = menuItemRepository.findAvailableItemsByCategory(category);
        return ResponseEntity.ok(menuItems);
    }

    // Public endpoint - Search menu items
    @GetMapping("/search")
    public ResponseEntity<List<MenuItem>> searchMenuItems(@RequestParam String query) {
        List<MenuItem> menuItems = menuItemRepository.searchAvailableItems(query);
        return ResponseEntity.ok(menuItems);
    }

    // Public endpoint - Get single menu item
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItem(@PathVariable Long id) {
        Optional<MenuItem> menuItem = menuItemRepository.findById(id);
        if (menuItem.isPresent() && menuItem.get().getIsAvailable()) {
            return ResponseEntity.ok(menuItem.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Admin endpoint - Add new menu item
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuItem> addMenuItem(@Valid @RequestBody MenuItem menuItem) {
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return ResponseEntity.ok(savedMenuItem);
    }

    // Admin endpoint - Update menu item
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItem menuItemDetails) {
        Optional<MenuItem> menuItem = menuItemRepository.findById(id);
        if (menuItem.isPresent()) {
            MenuItem existingItem = menuItem.get();
            existingItem.setName(menuItemDetails.getName());
            existingItem.setDescription(menuItemDetails.getDescription());
            existingItem.setPrice(menuItemDetails.getPrice());
            existingItem.setCategory(menuItemDetails.getCategory());
            existingItem.setImageUrl(menuItemDetails.getImageUrl());
            existingItem.setIsAvailable(menuItemDetails.getIsAvailable());
            existingItem.setPreparationTime(menuItemDetails.getPreparationTime());
            existingItem.setIsVegetarian(menuItemDetails.getIsVegetarian());
            existingItem.setIsSpicy(menuItemDetails.getIsSpicy());
            existingItem.setCalories(menuItemDetails.getCalories());
            
            MenuItem updatedMenuItem = menuItemRepository.save(existingItem);
            return ResponseEntity.ok(updatedMenuItem);
        }
        return ResponseEntity.notFound().build();
    }

    // Admin endpoint - Delete menu item (soft delete by setting availability to false)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        Optional<MenuItem> menuItem = menuItemRepository.findById(id);
        if (menuItem.isPresent()) {
            MenuItem existingItem = menuItem.get();
            existingItem.setIsAvailable(false);
            menuItemRepository.save(existingItem);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Admin endpoint - Get all menu items (including unavailable ones)
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MenuItem>> getAllMenuItemsForAdmin() {
        List<MenuItem> menuItems = menuItemRepository.findAll();
        return ResponseEntity.ok(menuItems);
    }

    // Public endpoint - Get vegetarian items
    @GetMapping("/vegetarian")
    public ResponseEntity<List<MenuItem>> getVegetarianItems() {
        List<MenuItem> menuItems = menuItemRepository.findVegetarianItems();
        return ResponseEntity.ok(menuItems);
    }
}
