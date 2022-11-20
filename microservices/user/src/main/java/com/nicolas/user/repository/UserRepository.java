package com.nicolas.user.repository;

import com.nicolas.user.model.Enums.Status;
import com.nicolas.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "FROM User WHERE id = :id AND status = :status")
    Optional<User> findByIdAndStatus(@Param("id") Long id, @Param("status") Status status);
    List<User> findAllByStatusOrderById(Status status);
    Optional<User> findByEmail(String email);

    // List<User> findAllByOrderByIdAsc();
}
