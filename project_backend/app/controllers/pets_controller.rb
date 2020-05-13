class PetsController < ApplicationController
    def index
        pet = Pet.all 
        render json: pet
    end
end
