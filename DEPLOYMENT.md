# CRM Frontend Deployment Guide

## Coolify Deployment

Bu proje Coolify ile deploy edilmek üzere hazırlanmıştır.

### Gereksinimler

- Docker
- Coolify instance
- Domain: `crm.smiloai.com`

### Deployment Adımları

1. **Coolify'da Yeni Proje Oluştur**
   - Project Name: `crm-frontend`
   - Repository: `https://github.com/usufefe/crm.smiloai-frontend.git`

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://api.smiloai.com/api
   NODE_ENV=production
   GENERATE_SOURCEMAP=false
   ```

3. **Domain Ayarları**
   - Primary Domain: `crm.smiloai.com`
   - SSL Certificate: Let's Encrypt (otomatik)

4. **Build Ayarları**
   - Build Command: `npm run build:prod`
   - Dockerfile: `./Dockerfile` (otomatik algılanır)
   - Port: `80`

### Docker Commands (Local Test)

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Test locally
curl http://localhost/health
```

### Nginx Configuration

- SPA routing desteği
- Gzip compression
- Security headers
- Static asset caching
- API proxy (backend bağlantısı için)

### Health Check

- Endpoint: `/health`
- Interval: 30 saniye
- Timeout: 10 saniye

### Troubleshooting

1. **Build Hatası**: Node.js version kontrolü (18+ gerekli)
2. **API Bağlantısı**: Environment variables kontrolü
3. **Routing Sorunu**: nginx.conf dosyası kontrolü

### Monitoring

- Health check endpoint: `https://crm.smiloai.com/health`
- Nginx access logs: `/var/log/nginx/access.log`
- Error logs: `/var/log/nginx/error.log`
