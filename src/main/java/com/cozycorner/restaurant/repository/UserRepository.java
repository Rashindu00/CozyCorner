package com.cozycorner.restaurant.repository;

import com.cozycorner.restaurant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    List<User> findByRoleAndIsActive(User.Role role, Boolean isActive);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.isActive = true")
    List<User> findActiveUsersByRole(@Param("role") User.Role role);
    
    // Find available drivers (active drivers with DRIVER role)
    @Query("SELECT u FROM User u WHERE u.role = 'DRIVER' AND u.isActive = true")
    List<User> findAvailableDrivers();
    
    // Find customers with loyalty points greater than a certain amount
    @Query("SELECT u FROM User u WHERE u.role = 'CUSTOMER' AND u.loyaltyPoints >= :minPoints")
    List<User> findCustomersWithMinLoyaltyPoints(@Param("minPoints") Integer minPoints);
}
