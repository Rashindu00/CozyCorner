package com.cozycorner.restaurant.repository;

import com.cozycorner.restaurant.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    
    List<MenuItem> findByCategory(MenuItem.Category category);
    
    List<MenuItem> findByIsAvailable(Boolean isAvailable);
    
    List<MenuItem> findByCategoryAndIsAvailable(MenuItem.Category category, Boolean isAvailable);
    
    @Query("SELECT m FROM MenuItem m WHERE m.isAvailable = true")
    List<MenuItem> findAllAvailableItems();
    
    @Query("SELECT m FROM MenuItem m WHERE m.category = :category AND m.isAvailable = true")
    List<MenuItem> findAvailableItemsByCategory(@Param("category") MenuItem.Category category);
    
    // Search menu items by name or description
    @Query("SELECT m FROM MenuItem m WHERE m.isAvailable = true AND " +
           "(LOWER(m.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(m.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<MenuItem> searchAvailableItems(@Param("searchTerm") String searchTerm);
    
    // Find items by price range
    @Query("SELECT m FROM MenuItem m WHERE m.isAvailable = true AND m.price BETWEEN :minPrice AND :maxPrice")
    List<MenuItem> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice);
    
    // Find vegetarian items
    @Query("SELECT m FROM MenuItem m WHERE m.isAvailable = true AND m.isVegetarian = true")
    List<MenuItem> findVegetarianItems();
    
    // Find items by dietary preferences
    @Query("SELECT m FROM MenuItem m WHERE m.isAvailable = true AND " +
           "(:vegetarian = false OR m.isVegetarian = true) AND " +
           "(:spicy = false OR m.isSpicy = true)")
    List<MenuItem> findByDietaryPreferences(@Param("vegetarian") Boolean vegetarian, @Param("spicy") Boolean spicy);
}
