Rails.application.routes.draw do
  resources :pets do
    resources :treats
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
