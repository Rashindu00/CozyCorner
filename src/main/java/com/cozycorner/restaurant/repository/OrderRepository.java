package com.cozycorner.restaurant.repository;

import com.cozycorner.restaurant.entity.Order;
import com.cozycorner.restaurant.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByCustomer(User customer);
    
    List<Order> findByCustomerOrderByCreatedAtDesc(User customer);
    
    List<Order> findByStatus(Order.OrderStatus status);
    
    List<Order> findByStatusOrderByCreatedAtAsc(Order.OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.status IN :statuses ORDER BY o.createdAt ASC")
    List<Order> findByStatusInOrderByCreatedAtAsc(@Param("statuses") List<Order.OrderStatus> statuses);
    
    // Find orders by date range
    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate ORDER BY o.createdAt DESC")
    List<Order> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Find today's orders
    @Query("SELECT o FROM Order o WHERE DATE(o.createdAt) = CURRENT_DATE ORDER BY o.createdAt DESC")
    List<Order> findTodaysOrders();
    
    // Find pending orders (orders that need attention)
    @Query("SELECT o FROM Order o WHERE o.status IN ('PENDING', 'CONFIRMED', 'PREPARING') ORDER BY o.createdAt ASC")
    List<Order> findPendingOrders();
    
    // Find orders ready for delivery
    @Query("SELECT o FROM Order o WHERE o.status = 'READY' AND o.orderType = 'DELIVERY' ORDER BY o.createdAt ASC")
    List<Order> findOrdersReadyForDelivery();
    
    // Find orders ready for pickup
    @Query("SELECT o FROM Order o WHERE o.status = 'READY' AND o.orderType = 'PICKUP' ORDER BY o.createdAt ASC")
    List<Order> findOrdersReadyForPickup();
    
    // Sales analytics
    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'DELIVERED' AND DATE(o.createdAt) = CURRENT_DATE")
    Long countTodaysCompletedOrders();
    
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.status = 'DELIVERED' AND DATE(o.createdAt) = CURRENT_DATE")
    Double getTodaysRevenue();
    
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.status = 'DELIVERED' AND o.createdAt BETWEEN :startDate AND :endDate")
    Double getRevenueByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Customer order history with limit
    @Query("SELECT o FROM Order o WHERE o.customer = :customer ORDER BY o.createdAt DESC")
    List<Order> findCustomerOrderHistory(@Param("customer") User customer);
}
