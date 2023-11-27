From nginx:1.23.0

# RUN mkdir -p /etc/nginx/certs
# RUN mkdir -p /var/cache/nginx/client_temp
# RUN mkdir -p /var/cache/nginx/proxy_temp

# RUN chown -R nginx:nginx /etc/nginx/certs

COPY ./certs /etc/nginx/certs

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]