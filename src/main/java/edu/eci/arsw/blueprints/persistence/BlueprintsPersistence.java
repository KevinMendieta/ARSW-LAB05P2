/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import java.util.List;
import java.util.Set;

/**
 *
 * @author hcadavid
 */
public interface BlueprintsPersistence {
    
    /**
     * 
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;
    
    /**
     * Take a specific blueprint.
     * @param author blueprint's author
     * @param bprintname blueprint's name
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String bprintname) throws BlueprintNotFoundException;
    
    /**
     * 
     * @param author blueprint's author 
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException;
    
    /**
     * Gets all the current blueprints on memory.
     * @return a set with all the current blueprints.
     */
    public Set<Blueprint> getAllBlueprints();
    
    /**
     * Updates a blueprint.
     * @param blueprint the new blueprint with the new content.
     * @throws BlueprintNotFoundException if the blueprint does not exist.
     */
    public void updateBlueprint(Blueprint blueprint) throws BlueprintNotFoundException;
    
    /**
     * Deletes a blueprint.
     * @param author blueprint's author
     * @param bprintname blueprint's name
     * @throws BlueprintNotFoundException if the blueprint does not exist.
     */
    public void deleteBlueprint(String author, String bprintname) throws BlueprintNotFoundException;

}