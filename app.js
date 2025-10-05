// Branch data from the provided JSON - Updated with الواحة
const branchData = {
    names: ["الواحة", "CAIRO", "Matajer", "Raya", "Sutherland", "F15"],
    totalSales: [5740901, 5489209, 5349267, 3203622, 2820838, 984402],
    marketShare: [24.34, 23.27, 22.68, 13.58, 11.96, 4.17],
    avgTransaction: [7664.75, 6397.68, 6579.66, 4767.29, 3880.11, 3875.60],
    growthRates: [12.62, -12.99, -16.46, -23.28, -7.81, 0],
    transactionCount: [749, 858, 813, 672, 727, 254]
};

const monthlyData = {
    months: ["يوليو", "أغسطس", "سبتمبر"],
    CAIRO: [1934798, 1870925, 1683486],
    Matajer: [1868719, 1919377, 1561171],
    "الواحة": [1823883, 1863026, 2053992],
    Raya: [1223609, 1041305, 938708],
    Sutherland: [976134, 944823, 899881],
    F15: [0, 0, 984402]
};

const categoriesData = {
    names: ["Market", "Pasta", "Sandwich", "Turkish Coffee", "Fattah", "Desserts"],
    sales: [4529383, 2131293, 2007670, 1811766, 1658106, 1649850],
    percentages: [19.2, 9.0, 8.5, 7.7, 7.0, 7.0]
};

const topProducts = {
    CAIRO: [
        {name: "Redbull Can", sales: 307601},
        {name: "Spuds Large", sales: 292413},
        {name: "Chicken Fattah Large", sales: 263530},
        {name: "Water Small", sales: 233707},
        {name: "Biscuit 7LE", sales: 219433}
    ],
    "الواحة": [
        {name: "Redbull Can", sales: 648340},
        {name: "Turkish Coffee", sales: 307594},
        {name: "Water Small", sales: 251377},
        {name: "V 7 Cola", sales: 197719},
        {name: "Chicken Fattah Large", sales: 165913}
    ],
    Matajer: [
        {name: "Redbull Can", sales: 302020},
        {name: "Chicken Fattah Large", sales: 227756},
        {name: "Turkish Coffee", sales: 174192},
        {name: "Crispy Fattah Large", sales: 169982},
        {name: "Crispy Pasta Large", sales: 163467}
    ],
    Raya: [
        {name: "Chicken Fattah Large", sales: 244163},
        {name: "Crispy Pasta Large", sales: 186240},
        {name: "Crispy Fattah Large", sales: 141365},
        {name: "Cheesy Fries Sandwich", sales: 120137},
        {name: "Chicken Alfredo Large", sales: 99760}
    ],
    Sutherland: [
        {name: "Redbull Can", sales: 124562},
        {name: "Spanish Latte", sales: 105738},
        {name: "Turkish Coffee Large", sales: 99492},
        {name: "English Cake", sales: 77433},
        {name: "Milk Turkish Large", sales: 76013}
    ],
    F15: [
        {name: "Chicken Fattah Large", sales: 63228},
        {name: "Crispy Pasta Large", sales: 45038},
        {name: "Chicken Alfredo Large", sales: 41549},
        {name: "Crispy Fattah Large", sales: 35503},
        {name: "Mac & Cheese Large", sales: 33971}
    ]
};

const keyMetrics = {
    totalRevenue: 23588239,
    totalBranches: 6,
    totalTransactions: 4073,
    averageTransaction: 5791.37,
    totalDiscounts: 32269,
    discountRate: 0.14
};

// Chart colors from design system
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Branch name mapping for Arabic display - Updated
const branchDisplayNames = {
    "الواحة": "الواحة",
    "CAIRO": "القاهرة", 
    "Matajer": "متاجر",
    "Raya": "راية",
    "Sutherland": "سازرلاند",
    "F15": "F15"
};

// Format number with Arabic locale
function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return new Intl.NumberFormat('ar-EG').format(Math.round(num));
}

// Format currency
function formatCurrency(num) {
    if (typeof num !== 'number') return num;
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return formatNumber(num);
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    populatePerformanceTable();
    populateTopProducts();
    populateBranchRanking();
    addInteractivity();
});

// Initialize all charts
function initializeCharts() {
    initializeTotalSalesChart();
    initializeMonthlyTrendChart();
    initializeAvgTransactionChart();
    initializeGrowthRatesChart();
    initializeCategoriesChart();
    initializePerformanceMetricsChart();
}

// 1. Total Sales Chart with Market Share
function initializeTotalSalesChart() {
    const ctx = document.getElementById('totalSalesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: branchData.names.map(name => branchDisplayNames[name] || name),
            datasets: [{
                label: 'إجمالي المبيعات',
                data: branchData.totalSales,
                backgroundColor: chartColors.slice(0, 6),
                borderColor: chartColors.slice(0, 6),
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            return [
                                `المبيعات: ${formatCurrency(context.raw)} جنيه`,
                                `الحصة السوقية: ${branchData.marketShare[index]}%`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'المبيعات (جنيه)'
                    }
                }
            },
            elements: {
                bar: {
                    borderSkipped: false
                }
            }
        }
    });
}

// 2. Monthly Trends Chart
function initializeMonthlyTrendChart() {
    const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
    
    const datasets = branchData.names.map((branch, index) => ({
        label: branchDisplayNames[branch] || branch,
        data: monthlyData[branch],
        borderColor: chartColors[index],
        backgroundColor: chartColors[index] + '20',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
    }));
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatCurrency(context.raw)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'المبيعات (جنيه)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// 3. Average Transaction Chart
function initializeAvgTransactionChart() {
    const ctx = document.getElementById('avgTransactionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: branchData.names.map(name => branchDisplayNames[name] || name),
            datasets: [{
                label: 'متوسط قيمة المعاملة',
                data: branchData.avgTransaction,
                backgroundColor: chartColors.slice(0, 6),
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `المتوسط: ${formatNumber(context.raw)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'متوسط قيمة المعاملة (جنيه)'
                    }
                }
            }
        }
    });
}

// 4. Growth Rates Chart
function initializeGrowthRatesChart() {
    const ctx = document.getElementById('growthRatesChart').getContext('2d');
    
    const colors = branchData.growthRates.map(rate => {
        if (rate > 0) return chartColors[0]; // Teal for positive
        else if (rate < 0) return chartColors[2]; // Red for negative
        else return chartColors[4]; // Gray for new/no change
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: branchData.names.map(name => branchDisplayNames[name] || name),
            datasets: [{
                label: 'معدل النمو (%)',
                data: branchData.growthRates,
                backgroundColor: colors,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            if (value === 0) {
                                return 'فرع جديد';
                            }
                            return `النمو: ${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'معدل النمو (%)'
                    }
                }
            }
        }
    });
}

// 5. Categories Donut Chart
function initializeCategoriesChart() {
    const ctx = document.getElementById('categoriesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoriesData.names,
            datasets: [{
                data: categoriesData.sales,
                backgroundColor: chartColors.slice(0, 6),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return [
                                `${context.label}`,
                                `المبيعات: ${formatCurrency(context.raw)} جنيه`,
                                `النسبة: ${percentage}%`
                            ];
                        }
                    }
                }
            }
        }
    });
}

// 6. Performance Metrics Comparison Chart
function initializePerformanceMetricsChart() {
    const ctx = document.getElementById('performanceMetricsChart').getContext('2d');
    
    // Normalize data for comparison (0-100 scale)
    const normalizedSales = branchData.totalSales.map(val => (val / Math.max(...branchData.totalSales)) * 100);
    const normalizedTransactions = branchData.avgTransaction.map(val => (val / Math.max(...branchData.avgTransaction)) * 100);
    const normalizedCount = branchData.transactionCount.map(val => (val / Math.max(...branchData.transactionCount)) * 100);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: branchData.names.map(name => branchDisplayNames[name] || name),
            datasets: [
                {
                    label: 'إجمالي المبيعات',
                    data: normalizedSales,
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    borderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'متوسط المعاملة',
                    data: normalizedTransactions,
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    borderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'عدد المعاملات',
                    data: normalizedCount,
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    borderWidth: 2,
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Populate Performance Table
function populatePerformanceTable() {
    const tableBody = document.getElementById('performanceTableBody');
    
    // Create array with branch data and sort by total sales
    const branchPerformance = branchData.names.map((name, index) => ({
        name: name,
        displayName: branchDisplayNames[name] || name,
        totalSales: branchData.totalSales[index],
        marketShare: branchData.marketShare[index],
        avgTransaction: branchData.avgTransaction[index],
        
        growthRate: branchData.growthRates[index]
    })).sort((a, b) => b.totalSales - a.totalSales);
    
    branchPerformance.forEach((branch, index) => {
        const row = document.createElement('tr');
        
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const growthClass = branch.growthRate > 0 ? 'positive-growth' : 
                           branch.growthRate < 0 ? 'negative-growth' : 'new-branch';
        
        row.innerHTML = `
            <td><strong>${branch.displayName}</strong></td>
            <td>${formatCurrency(branch.totalSales)} جنيه</td>
            <td>${branch.marketShare}%</td>
            <td>${formatNumber(branch.avgTransaction)} جنيه</td>
            
            <td class="${growthClass}">
                ${branch.growthRate === 0 ? 'فرع جديد' : 
                  (branch.growthRate > 0 ? '+' : '') + branch.growthRate.toFixed(2) + '%'}
            </td>
            <td class="${rankClass}">${index + 1}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Populate Top Products
function populateTopProducts() {
    const productsGrid = document.getElementById('topProductsGrid');
    
    Object.entries(topProducts).forEach(([branchName, products]) => {
        const branchDiv = document.createElement('div');
        branchDiv.className = 'branch-products';
        
        const displayName = branchDisplayNames[branchName] || branchName;
        
        branchDiv.innerHTML = `
            <h4 onclick="toggleProducts(this)">أفضل المنتجات - فرع ${displayName}</h4>
            <ul class="products-list">
                ${products.map(product => `
                    <li class="product-item">
                        <span class="product-name">${product.name}</span>
                        <span class="product-sales">${formatCurrency(product.sales)} جنيه</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        productsGrid.appendChild(branchDiv);
    });
}

// Toggle Products Visibility
function toggleProducts(header) {
    const productsList = header.nextElementSibling;
    const isCollapsed = productsList.classList.contains('collapsed');
    
    if (isCollapsed) {
        productsList.classList.remove('collapsed');
        header.classList.remove('collapsed');
    } else {
        productsList.classList.add('collapsed');
        header.classList.add('collapsed');
    }
}

// Populate Branch Ranking
function populateBranchRanking() {
    const rankingList = document.getElementById('branchRanking');
    
    // Create sorted array by total sales
    const sortedBranches = branchData.names.map((name, index) => ({
        name: name,
        displayName: branchDisplayNames[name] || name,
        totalSales: branchData.totalSales[index],
        marketShare: branchData.marketShare[index],
        growthRate: branchData.growthRates[index]
    })).sort((a, b) => b.totalSales - a.totalSales);
    
    sortedBranches.forEach((branch, index) => {
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';
        
        const growthClass = branch.growthRate > 0 ? 'positive-growth' : 
                           branch.growthRate < 0 ? 'negative-growth' : 'new-branch';
        
        rankingItem.innerHTML = `
            <div class="branch-rank">${index + 1}</div>
            <div class="branch-info">
                <div class="branch-name">${branch.displayName}</div>
                <div class="branch-details">
                    ${formatCurrency(branch.totalSales)} جنيه - حصة سوقية ${branch.marketShare}%
                </div>
            </div>
            <div class="growth-indicator ${growthClass}">
                ${branch.growthRate === 0 ? 'جديد' : 
                  (branch.growthRate > 0 ? '+' : '') + branch.growthRate.toFixed(1) + '%'}
            </div>
        `;
        
        rankingList.appendChild(rankingItem);
    });
}

// Add Enhanced Interactivity
function addInteractivity() {
    // Chart container click highlighting with enhanced animation
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Remove highlight from all containers
            chartContainers.forEach(c => c.classList.remove('highlighted'));
            
            // Add highlight to clicked container
            this.classList.add('highlighted');
            
            // Auto-remove highlight after 3 seconds
            setTimeout(() => {
                this.classList.remove('highlighted');
            }, 3000);
        });
        
        // Add hover effect for chart containers
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        container.addEventListener('mouseleave', function() {
            if (!this.classList.contains('highlighted')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
    });
    
    // Enhanced table row interactions
    const tableRows = document.querySelectorAll('.performance-table tbody tr');
    tableRows.forEach((row, index) => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
            this.style.zIndex = '10';
            this.style.position = 'relative';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
        
        // Add click effect for table rows
        row.addEventListener('click', function() {
            // Remove active class from all rows
            tableRows.forEach(r => r.classList.remove('active-row'));
            
            // Add active class to clicked row
            this.classList.add('active-row');
            
            // Highlight corresponding chart if exists
            const branchName = this.querySelector('td strong').textContent;
            console.log(`Clicked on branch: ${branchName}`);
        });
    });
    
    // Recommendation cards enhanced interactions
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    recommendationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        // Add click effect for recommendation cards
        card.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Add subtle animation
            this.style.transform = 'scale(1.01)';
            setTimeout(() => {
                this.style.transform = this.matches(':hover') ? 'translateY(-4px)' : 'translateY(-2px)';
            }, 200);
        });
    });
    
    // Add smooth scrolling for internal navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for section visibility
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate charts when they come into view
                const charts = entry.target.querySelectorAll('.chart-container');
                charts.forEach((chart, index) => {
                    setTimeout(() => {
                        chart.style.opacity = '1';
                        chart.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Initialize charts with hidden state for animation
        const charts = section.querySelectorAll('.chart-container');
        charts.forEach(chart => {
            chart.style.opacity = '0';
            chart.style.transform = 'translateY(20px)';
            chart.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'H' to scroll to top
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Press 'S' to toggle section visibility (for demo purposes)
        if (e.key === 's' || e.key === 'S') {
            const allSections = document.querySelectorAll('section');
            allSections.forEach(section => {
                section.style.transition = 'opacity 0.3s ease';
                if (section.style.opacity === '0.5') {
                    section.style.opacity = '1';
                } else {
                    section.style.opacity = '0.5';
                }
            });
            
            // Reset after 2 seconds
            setTimeout(() => {
                allSections.forEach(section => {
                    section.style.opacity = '1';
                });
            }, 2000);
        }
    });
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        const firstSection = document.querySelector('section');
        if (firstSection) {
            firstSection.classList.add('visible');
        }
    }, 100);
    
    // Add print-friendly functionality
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections for printing
        const collapsedElements = document.querySelectorAll('.collapsed');
        collapsedElements.forEach(element => {
            element.classList.remove('collapsed');
            element.setAttribute('data-was-collapsed', 'true');
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Restore collapsed state after printing
        const wasCollapsed = document.querySelectorAll('[data-was-collapsed="true"]');
        wasCollapsed.forEach(element => {
            element.classList.add('collapsed');
            element.removeAttribute('data-was-collapsed');
        });
    });
}