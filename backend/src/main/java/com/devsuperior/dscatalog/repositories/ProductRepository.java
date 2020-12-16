package com.devsuperior.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	@Query("SELECT DISTINCT obj FROM Product obj INNER JOIN obj.categories cats WHERE "
			+ "(COALESCE(:categories) IS NULL OR cats IN :categories) AND "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')) )")
	Page<Product> find(List<Category> categories, String name, Pageable pageable); 
}

// Se :category for null toda a restrição se torna verdadeira buscando todos produtos.
// se :category for !null ele evecuta a regra apos o OR.
// Cláusula DISTINCT garante que não havera repetiçção de produto.
// LOWER converte tudo para minusculo garantindo que não seja rxista problemas com case sentitive na hora de buscar
// COALESCE faz uma adaptação aos valores nulos, émais compativel entre os banco de dados. 